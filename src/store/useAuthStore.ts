import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  joinedMatchIds: number[];
  login: (_user: User) => void; // user -> _user
  logout: () => void;
  joinMatch: (_matchId: number) => void; // matchId -> _matchId
  leaveMatch: (_matchId: number) => void; // matchId -> _matchId
  setJoinedMatches: (_matchIds: number[]) => void; // matchIds -> _matchIds
}

// Mock users for demonstration - ERD 변경사항 반영
const mockUsers: Record<string, User> = {
  admin: {
    id: 1, // userId -> id
    email: 'admin@kickytime.com',
    nickname: '관리자',
    role: 'ADMIN',
    rank: 'MASTER',
    imageUrl: '/images/default-profile.png', // profileImageUrl -> imageUrl
    createdAt: '2025-08-01T12:00:00Z',
  },
  user: {
    id: 2, // userId -> id
    email: 'user@kickytime.com',
    nickname: '민지',
    role: 'USER',
    rank: 'BEGINNER', // BEGINER -> BEGINNER
    imageUrl: '/images/default-profile.png', // profileImageUrl -> imageUrl
    createdAt: '2025-08-01T12:00:00Z',
  },
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  joinedMatchIds: [1, 3], // Mock joined matches (ID 변경)

  login: (user: User) => {
    set({ isAuthenticated: true, user });
  },

  logout: () => {
    set({ isAuthenticated: false, user: null, joinedMatchIds: [] });
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
}));

// Helper function to mock login
export const mockLogin = (userType: 'admin' | 'user') => {
  const authStore = useAuthStore.getState();
  authStore.login(mockUsers[userType]);
};
