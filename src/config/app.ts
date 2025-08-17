// 앱 설정을 중앙에서 관리
export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Kickytime',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  isDevelopment: import.meta.env.VITE_DEV_MODE === 'true',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
} as const;

// 환경변수 검증
export const validateEnvironment = () => {
  const requiredEnvVars = ['VITE_API_BASE_URL'];

  const missingVars = requiredEnvVars.filter((varName) => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set.',
    );
  }
};

// 개발 모드에서만 환경변수 정보 출력
if (appConfig.debugMode) {
  console.log('App Configuration:', {
    name: appConfig.name,
    version: appConfig.version,
    apiBaseUrl: appConfig.apiBaseUrl,
    isDevelopment: appConfig.isDevelopment,
    useMockData: appConfig.useMockData,
  });
}
