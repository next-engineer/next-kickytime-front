type CognitoConfig = {
  hostedUiDomain: string;
  clientId: string;
  redirectUri: string;
  scopes: string[];
};

function requireEnv(name: string) {
  const v = import.meta.env[name as keyof ImportMetaEnv] as string | undefined;
  if (!v) {
    throw new Error(`Missing env: ${name}`);
  }
  return v;
}

export const COGNITO: CognitoConfig = {
  hostedUiDomain: requireEnv('VITE_COGNITO_DOMAIN'),
  clientId: requireEnv('VITE_COGNITO_CLIENT_ID'),
  redirectUri: requireEnv('VITE_COGNITO_REDIRECT_URI'),
  scopes: ['openid', 'email', 'profile'],
};
