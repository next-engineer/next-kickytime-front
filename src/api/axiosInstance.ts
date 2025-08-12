import axios from 'axios';

// 환경변수 검증
const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) {
  throw new Error('VITE_API_BASE_URL environment variable is required');
}

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  // API 호출 시 JWT 토큰을 헤더에 추가
  // const token = localStorage.getItem('accessToken');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  // 개발 모드에서 요청 로깅
  if (import.meta.env.VITE_DEBUG_MODE === 'true') {
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      data: config.data,
    });
  }

  return config;
});

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    // 개발 모드에서 응답 로깅
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    // 공통 에러 처리
    if (error.response?.status === 401) {
      // 인증 오류 시 로그인 페이지로 리다이렉트
      // window.location.href = '/login';
    }

    // 개발 모드에서 에러 로깅
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.error('API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  },
);
