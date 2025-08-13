// src/api/axiosInstance.ts
import axios, { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// --- 기본 설정 & 환경 변수 검증 ---
const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined;
if (!baseURL) {
  throw new Error('VITE_API_BASE_URL environment variable is required');
}
const DEBUG = import.meta.env.VITE_DEBUG_MODE === 'true';

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

// --- 유틸들 ---
function getAccessToken(): string | null {
  const { tokens } = useAuthStore.getState();
  return tokens?.accessToken ?? localStorage.getItem('access_token');
}

function getIdToken(): string | null {
  const { tokens } = useAuthStore.getState();
  return tokens?.idToken ?? localStorage.getItem('id_token');
}

function toAbsoluteURL(url?: string, cfgBaseURL?: string): URL | null {
  if (!url) return null;
  try {
    return new URL(url); // 절대 URL
  } catch {
    try {
      return new URL(url, cfgBaseURL ?? baseURL); // 상대 → 절대
    } catch {
      return null;
    }
  }
}

const SKIP_AUTH_PATHS = ['/auth/refresh', '/auth/logout', '/health'];

function shouldSkipAuth(config: InternalAxiosRequestConfig): boolean {
  // 사용자가 직접 Authorization을 준 경우 존중
  const hasAuthHeader =
    (config.headers?.Authorization as string | undefined) ??
    (config.headers as Record<string, unknown> | undefined)?.authorization;
  if (hasAuthHeader) return true;

  const reqUrl = toAbsoluteURL(config.url, config.baseURL ?? baseURL);
  if (!reqUrl) return false;

  // baseURL과 동일한 오리진에만 토큰 부착
  const base = new URL(baseURL!);
  if (reqUrl.origin !== base.origin) return true;

  // baseURL에 path prefix가 있는 경우(예: https://host/api) 그 하위 경로만 적용
  if (!reqUrl.pathname.startsWith(base.pathname)) return true;

  // 스킵 리스트 적용 (base pathname 이후의 상대 경로 기준)
  const relPath = reqUrl.pathname.slice(base.pathname.length) || '/';
  return SKIP_AUTH_PATHS.some((p) => relPath.startsWith(p));
}

function safeRequestLog(config: InternalAxiosRequestConfig) {
  if (!DEBUG) return;
  const headers = { ...(config.headers as Record<string, unknown>) };
  if ('Authorization' in headers) headers.Authorization = 'Bearer ***';
  if ('authorization' in headers) headers.authorization = 'Bearer ***';
  if ('X-ID-Token' in headers) headers['X-ID-Token'] = '***';
  if ('x-id-token' in headers) headers['x-id-token'] = '***';
}

function safeResponseLog(res: AxiosResponse) {
  if (!DEBUG) return;
  console.log('API Response:', {
    status: res.status,
    url: res.config.url,
    data: res.data,
  });
}

function safeErrorLog(err: AxiosError) {
  if (!DEBUG) return;
  console.error('API Error:', {
    status: err.response?.status,
    url: err.config?.url,
    message: err.message,
    data: err.response?.data,
  });
}

// --- 인터셉터들 ---
// Request: Bearer 자동 부착(+ 안전 로깅)
api.interceptors.request.use((config) => {
  if (!shouldSkipAuth(config)) {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
    const idToken = getIdToken();
    if (idToken) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>)['X-ID-Token'] = idToken;
    }
  }
  safeRequestLog(config);
  return config;
});

// Response: 공통 로깅 + 401 처리(토큰 정리)
api.interceptors.response.use(
  (res) => {
    safeResponseLog(res);
    return res;
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // 토큰 정리
      const { clearTokens } = useAuthStore.getState();
      if (clearTokens) clearTokens();
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('refresh_token');
    }
    safeErrorLog(err);
    return Promise.reject(err);
  },
);
