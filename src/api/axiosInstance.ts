import axios, { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// 기본 환경 변수와 설정
const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined;
if (!baseURL) {
  throw new Error('VITE_API_BASE_URL environment variable is required');
}
const DEBUG = import.meta.env.VITE_DEBUG_MODE === 'true';

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

// 토큰 관리 함수
function getAccessToken(): string | null {
  const { tokens } = useAuthStore.getState();
  return tokens?.accessToken ?? localStorage.getItem('access_token');
}

function getIdToken(): string | null {
  const { tokens } = useAuthStore.getState();
  return tokens?.idToken ?? localStorage.getItem('id_token');
}

// 인증이 필요하지 않은 경로
const SKIP_AUTH_PATHS = ['/', '/auth/refresh', '/auth/logout', '/health'];

function shouldSkipAuth(config: InternalAxiosRequestConfig): boolean {
  // Authorization 헤더가 이미 있으면 스킵
  const hasAuthHeader = config.headers?.Authorization || config.headers?.authorization;
  if (hasAuthHeader) return true;

  // 스킵 경로 확인
  const url = config.url || '';
  return SKIP_AUTH_PATHS.some((path) => url.startsWith(path));
}

// 로그 함수들 (토큰 마스킹)
function safeRequestLog(config: InternalAxiosRequestConfig) {
  if (!DEBUG) return;
  const headers = { ...(config.headers as Record<string, unknown>) };
  if ('Authorization' in headers) headers.Authorization = 'Bearer ***';
  if ('authorization' in headers) headers.authorization = 'Bearer ***';
  if ('X-ID-Token' in headers) headers['X-ID-Token'] = '***';
  if ('x-id-token' in headers) headers['x-id-token'] = '***';
  console.log('API Request:', {
    method: config.method?.toUpperCase(),
    url: config.url,
    headers,
  });
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

// Request 인터셉터 - 자동 토큰 부착
api.interceptors.request.use((config) => {
  if (!shouldSkipAuth(config)) {
    const accessToken = getAccessToken();
    const idToken = getIdToken();

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (idToken) {
      config.headers = config.headers ?? {};
      config.headers['X-ID-Token'] = idToken;
    }
  }

  safeRequestLog(config);
  return config;
});

// Response 인터셉터 - 401 에러 처리
api.interceptors.response.use(
  (response) => {
    safeResponseLog(response);
    return response;
  },
  (error: AxiosError) => {
    safeErrorLog(error);

    // 401 에러 시 토큰 정리
    if (error.response?.status === 401) {
      const { clearTokens } = useAuthStore.getState();
      clearTokens?.();
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('refresh_token');
    }

    return Promise.reject(error);
  },
);
