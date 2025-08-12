import { create } from 'zustand';
import type { User } from '../types';

type Tokens = {
  idToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  joinedMatchIds: number[];

  // 기존 액션
  login: (_user: User) => void;
  logout: () => void;
  joinMatch: (_matchId: number) => void;
  leaveMatch: (_matchId: number) => void;
  setJoinedMatches: (_matchIds: number[]) => void;

  // 추가: 토큰 관련
  tokens: Tokens;
  setTokens: (tokens: Tokens) => void;
  syncFromStorage: () => void;
  clearTokens: () => void;
}

// Mock users (기존 유지)
const mockUsers: Record<string, User> = {
  admin: {
    id: 1,
    email: 'admin@kickytime.com',
    nickname: '관리자',
    role: 'ADMIN',
    rank: 'MASTER',
    imageUrl: '/images/default-profile.png',
    createdAt: '2025-08-01T12:00:00Z',
  },
  user: {
    id: 2,
    email: 'user@kickytime.com',
    nickname: '민지',
    role: 'USER',
    rank: 'BEGINNER',
    imageUrl: '/images/default-profile.png',
    createdAt: '2025-08-01T12:00:00Z',
  },
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  joinedMatchIds: [1, 3],

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
      joinedMatchIds: [],
      tokens: { idToken: null, accessToken: null, refreshToken: null },
    });
  },

  joinMatch: (matchId: number) => {
    const { joinedMatchIds } = get();
    if (!joinedMatchIds.includes(matchId)) {
      set({ joinedMatchIds: [...joinedMatchIds, matchId] });
    }
  },

  leaveMatch: (matchId: number) => {
    const { joinedMatchIds } = get();
    set({ joinedMatchIds: joinedMatchIds.filter((id) => id !== matchId) });
  },

  setJoinedMatches: (matchIds: number[]) => {
    set({ joinedMatchIds: matchIds });
  },

  // 추가: 교환 결과를 직접 세팅하고 싶을 때 사용 가능
  setTokens: (tokens: Tokens) => {
    set({
      tokens,
      isAuthenticated: Boolean(tokens.accessToken),
    });
  },

  // 추가: localStorage → store 동기화
  syncFromStorage: () => {
    const idToken = localStorage.getItem('id_token');
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    set({
      tokens: { idToken, accessToken, refreshToken },
      isAuthenticated: Boolean(accessToken),
    });
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
}));

// 기존 유지
export const mockLogin = (userType: 'admin' | 'user') => {
  const authStore = useAuthStore.getState();
  authStore.login(mockUsers[userType]);
};
