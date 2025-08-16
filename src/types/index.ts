export type UserRole = 'USER' | 'ADMIN';
export type UserRank = 'BEGINNER' | 'INTERMEDIATE' | 'MASTER';
export type MatchStatus = 'OPEN' | 'FULL' | 'CLOSED' | 'CANCELED';

export interface User {
  id: number;
  email: string;
  nickname: string;
  cognitoSub?: string;
  emailVerified?: boolean;
  password?: string; // nullable
  role: UserRole;
  rank: UserRank;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Match {
  id?: number;
  location: string;
  matchDateTime: string;
  maxPlayers: number;
  matchStatus: MatchStatus;
  createdBy: number;
  createdAt: string;
  updatedAt?: string;
  currentPlayers?: number; // currentPlayers는 match_participants 테이블에서 계산
}

export interface MatchParticipant {
  id: number;
  matchId: number;
  userId: number;
  joinedAt: string;
}

export interface CreateMatchRequest {
  location: string;
  matchDateTime: string;
  maxPlayers: number;
}

export interface MyMatchesResponse {
  summary: {
    totalCount: number;
    upcomingCount: number;
    completedCount: number;
  };
  matches: MatchInfo[];
}

export interface MatchInfo {
  id: number;
  participantId: number;
  location: string;
  matchDateTime: string;
  maxPlayers: number;
  currentPlayers: number;
  joinedAt: string;
  matchStatus: 'OPEN' | 'FULL' | 'CLOSED' | 'CANCELED';
}
