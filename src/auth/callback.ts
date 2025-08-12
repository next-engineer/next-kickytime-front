import { COGNITO } from './config';
import { useAuthStore } from '../store/useAuthStore';
import { postUserMe, getMyProfile } from '../api/userApi';

export type TokenResponse = {
  id_token: string;
  access_token: string;
  refresh_token?: string;
  token_type: 'Bearer';
  expires_in: number;
};

export async function handleAuthCallback(): Promise<TokenResponse | null> {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) throw new Error(url.searchParams.get('error_description') ?? error);
  if (!code) return null;

  // 🔒 중복 방지 가드 (StrictMode로 effect가 두 번 돌 때 대비)
  const guardKey = `exchanged_code_${code}`;
  if (sessionStorage.getItem(guardKey)) {
    console.log('[callback] duplicate exchange blocked');
    return null;
  }
  sessionStorage.setItem(guardKey, '1');

  const verifier = sessionStorage.getItem('pkce_verifier');
  if (!verifier) throw new Error('Missing PKCE verifier. Use the login button first.');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: COGNITO.clientId,
    code,
    redirect_uri: COGNITO.redirectUri,
    code_verifier: verifier,
  });

  const res = await fetch(`${COGNITO.hostedUiDomain}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error_description ?? 'Token exchange failed');

  useAuthStore.getState().setTokens({
    idToken: json.id_token ?? null,
    accessToken: json.access_token ?? null,
    refreshToken: json.refresh_token ?? null,
  });

  sessionStorage.removeItem('pkce_verifier');

  try {
    await postUserMe();
    const me = await getMyProfile();
    useAuthStore.getState().setUser(me);
  } catch (e) {
    console.error('[callback] user sync failed', e);
  }

  // code 제거 (새로고침 시 재호출 방지)
  window.history.replaceState({}, '', COGNITO.redirectUri);

  return json as TokenResponse;
}
