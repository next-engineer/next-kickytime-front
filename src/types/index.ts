export type UserRole = 'USER' | 'ADMIN';
export type UserRank = 'BEGINNER' | 'INTERMEDIATE' | 'MASTER';
export type MatchStatus = 'OPEN' | 'FULL' | 'CLOSED' | 'CANCELED';

export interface User {
  id: number; // userId -> id로 변경
  email: string;
  nickname: string;
  cognitoSub?: string;
  emailVerified?: boolean;
  password?: string; // nullable
  role: UserRole;
  rank: UserRank;
  imageUrl: string; // profileImageUrl -> imageUrl로 변경
  createdAt: string;
  updatedAt?: string;
}

export interface Match {
  id: number; // matchId -> id로 변경
  location: string;
  matchTime: string;
  maxPlayers: number;
  matchStatus: MatchStatus; // 새로 추가
  createdBy: number;
  createdAt: string;
  updatedAt?: string;
  // title 제거됨
  // currentPlayers는 match_participants 테이블에서 계산
  currentPlayers?: number; // 계산된 값
}

export interface MatchParticipant {
  id: number;
  matchId: number;
  userId: number;
  joinedAt: string;
}

export interface CreateMatchRequest {
  location: string;
  matchTime: string;
  maxPlayers: number;
}
