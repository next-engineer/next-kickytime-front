import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import { validateEnvironment } from './config/app';
import './index.css';
import App from './App.tsx';

// 환경변수 검증
try {
  validateEnvironment();
} catch (error) {
  console.error('Environment validation failed:', error);
  // 개발 모드에서는 에러를 표시하고, 프로덕션에서는 기본값 사용
  if (import.meta.env.DEV) {
    document.body.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: Arial, sans-serif;
        background: #f5f5f5;
      ">
        <div style="
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          max-width: 500px;
          text-align: center;
        ">
          <h2 style="color: #d32f2f; margin-bottom: 1rem;">환경변수 설정 오류</h2>
          <p style="margin-bottom: 1rem; line-height: 1.5;">${(error as Error).message}</p>
          <p style="color: #666; font-size: 0.9rem;">
            .env.sample 파일을 참고하여 .env 파일을 생성해주세요.
          </p>
        </div>
      </div>
    `;
    throw error;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
