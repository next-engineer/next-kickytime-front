function base64url(uint8: Uint8Array) {
  return btoa(String.fromCharCode(...uint8))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function randomString(n = 96) {
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  // 길이 제한 있는 브라우저가 있어 slice
  return base64url(arr).slice(0, n);
}

async function sha256(input: string) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hash);
}

export async function createPkce() {
  const verifier = randomString();
  const challenge = base64url(await sha256(verifier));
  // 토큰 교환 때 쓰려고 임시 저장
  sessionStorage.setItem('pkce_verifier', verifier);
  return { verifier, challenge };
}
