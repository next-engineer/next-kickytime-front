import { api } from './axiosInstance';
import type {
  Match,
  CreateMatchRequest,
  MatchParticipant,
  MatchInfo,
  MyMatchesResponse,
} from '../types';

// GET /api/matches - 전체 매치 조회
export async function fetchAllMatches(): Promise<Match[]> {
  const { data } = await api.get<Match[]>('matches');
  return data;
}

// GET /api/matches/me - 내 참여 매치 조회
export async function fetchMyMatches(): Promise<MatchInfo[]> {
  const { data } = await api.get<MyMatchesResponse>('matches/me');
  return data.matches;
}

// POST /api/matches - 매치 생성 (관리자)
export async function createMatch(matchData: CreateMatchRequest): Promise<Match> {
  const { data } = await api.post<Match>('matches', matchData);
  return data;
}

// POST /api/matches/{matchId}/participants - 매치 참여 (일반 사용자)
export async function joinMatch(matchId: number): Promise<MatchParticipant> {
  const { data } = await api.post<MatchParticipant>(`matches/${matchId}/participants`);
  return data;
}

// DELETE /api/matches/{matchId}/participants - 매치 참여 취소 (일반 사용자)
export async function leaveMatch(matchId: number): Promise<void> {
  await api.delete(`matches/${matchId}/participants`);
}

// DELETE /api/matches/{matchId} - 매치 삭제 (관리자)
export async function deleteMatch(matchId: number): Promise<void> {
  await api.delete(`matches/${matchId}`);
}

// GET /api/matches/{matchId}/participants - 매칭 참가자 조회 (관리자)
export async function fetchMatchParticipants(matchId: number): Promise<MatchParticipant[]> {
  const { data } = await api.get<MatchParticipant[]>(`matches/${matchId}/participants`);
  return data;
}
