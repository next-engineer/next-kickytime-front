import { COGNITO } from './config';
import { createPkce } from './pkce';

function buildAuthorizeUrl(path: 'login' | 'signup', challenge: string) {
  const u = new URL(`${COGNITO.hostedUiDomain}/${path}`);
  u.searchParams.set('response_type', 'code');
  u.searchParams.set('client_id', COGNITO.clientId);
  u.searchParams.set('redirect_uri', COGNITO.redirectUri);
  u.searchParams.set('scope', COGNITO.scopes.join(' '));
  u.searchParams.set('code_challenge_method', 'S256');
  u.searchParams.set('code_challenge', challenge);
  return u.toString();
}

export async function goLogin() {
  const { challenge } = await createPkce();
  window.location.href = buildAuthorizeUrl('login', challenge);
}

export async function goSignup() {
  const { challenge } = await createPkce();
  window.location.href = buildAuthorizeUrl('signup', challenge);
}
