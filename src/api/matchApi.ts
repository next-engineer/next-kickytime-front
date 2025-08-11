import { api } from './axiosInstance';
import type { Match, CreateMatchRequest, MatchParticipant } from '../types';

// API: GET /api/matches
// (Authorization: Bearer <access_token>)
export async function fetchAllMatches(): Promise<Match[]> {
  const { data } = await api.get<Match[]>('/api/matches');
  return data;
}

// API: GET /api/matches/me
// (Authorization: Bearer <access_token>)
export async function fetchMyMatches(): Promise<{
  items: Match[];
  page: number;
  size: number;
  total: number;
}> {
  const { data } = await api.get('/api/matches/me');
  return data;
}

// API: POST /api/matches
// (Authorization: Bearer <access_token>)
export async function createMatch(matchData: CreateMatchRequest): Promise<Match> {
  const { data } = await api.post<Match>('/api/matches', matchData);
  return data;
}

// API: POST /api/matches/{matchId}/participants
// (Authorization: Bearer <access_token>)
export async function joinMatch(matchId: number): Promise<MatchParticipant> {
  const { data } = await api.post<MatchParticipant>(`/api/matches/${matchId}/participants`, {});
  return data;
}

// API: DELETE /api/matches/{matchId}/participants
// (Authorization: Bearer <access_token>)
export async function leaveMatch(matchId: number): Promise<void> {
  await api.delete(`/api/matches/${matchId}/participants`);
}

// API: DELETE /api/matches/{matchId}
// (Authorization: Bearer <access_token>)
export async function deleteMatch(matchId: number): Promise<void> {
  await api.delete(`/api/matches/${matchId}`);
}

// API: PUT /api/matches/{matchId}/status
// (Authorization: Bearer <access_token>)
export async function updateMatchStatus(
  matchId: number,
  status: Match['matchStatus'],
): Promise<Match> {
  const { data } = await api.put<Match>(`/api/matches/${matchId}/status`, { status });
  return data;
}
