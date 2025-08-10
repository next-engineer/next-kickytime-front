import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
});

// 필요 시 인터셉터
api.interceptors.request.use((config) => {
  // 예: 토큰 주입
  // const token = localStorage.getItem('accessToken');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
