import { create } from 'zustand';
import type { User } from '../types';
import { fetchUserProfile } from '../api/userApi';

type Tokens = {
  idToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  // 기존 액션
  login: (_user: User) => void;
  logout: () => void;

  // 추가: 토큰 관련
  tokens: Tokens;
  setTokens: (tokens: Tokens) => void;
  syncFromStorage: () => Promise<void>;
  clearTokens: () => void;

  // [추가] /user/me 응답을 전역에 반영하기 위한 액션
  setUser: (_user: User | null) => void; // ← [추가]
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  // 초기 토큰 상태
  tokens: {
    idToken: null,
    accessToken: null,
    refreshToken: null,
  },

  // 기존 로직 유지
  login: (user: User) => {
    set({ isAuthenticated: true, user });
  },

  logout: () => {
    // 토큰도 함께 정리
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({
      isAuthenticated: false,
      user: null,
      tokens: { idToken: null, accessToken: null, refreshToken: null },
    });
  },

  // 추가: 교환 결과를 직접 세팅하고 싶을 때 사용 가능
  setTokens: (tokens: Tokens) => {
    // [수정] 새로고침 유지 위해 로컬스토리지에도 반영
    localStorage.setItem('id_token', tokens.idToken ?? '');
    localStorage.setItem('access_token', tokens.accessToken ?? '');
    localStorage.setItem('refresh_token', tokens.refreshToken ?? '');

    set({
      tokens,
      isAuthenticated: Boolean(tokens.accessToken),
    });
  },

  // 🔥 수정: 사용자 정보도 함께 복원
  syncFromStorage: async () => {
    try {
      const idToken = localStorage.getItem('id_token');
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!accessToken) {
        set({
          tokens: { idToken: null, accessToken: null, refreshToken: null },
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
        return;
      }

      // 토큰 복원
      set({
        tokens: { idToken, accessToken, refreshToken },
        isAuthenticated: true,
        isLoading: true, // 사용자 정보 로딩 중
      });

      // 사용자 정보 복원 시도
      try {
        const userProfile = await fetchUserProfile();
        set({
          user: userProfile,
          isLoading: false,
        });
      } catch (error) {
        console.error('사용자 정보 복원 실패:', error);
        // API 실패 시 토큰도 정리
        get().clearTokens();
      }
    } catch (error) {
      console.error('인증 상태 복원 실패:', error);
      set({
        tokens: { idToken: null, accessToken: null, refreshToken: null },
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  },

  // 추가: 로그아웃 외 개별적으로 토큰 비우고 싶을 때
  clearTokens: () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({
      tokens: { idToken: null, accessToken: null, refreshToken: null },
      isAuthenticated: false,
    });
  },

  // [추가] /user/me 결과 반영
  setUser: (_user) => set({ user: _user }), // ← [추가]
}));
