import { create } from 'zustand';
import type { Match } from '../types';

interface MatchState {
  matches: Match[];
  setMatches: (_matches: Match[]) => void; // matches -> _matches
  addMatch: (_match: Match) => void; // match -> _match
  removeMatch: (_matchId: number) => void; // matchId -> _matchId
  updateMatchParticipants: (_matchId: number, _currentPlayers: number) => void;
  updateMatchStatus: (_matchId: number, _status: Match['matchStatus']) => void;
}

// Mock match data - ERD 변경사항 반영
const mockMatches: Match[] = [
  {
    id: 1, // matchId -> id
    location: '서울 OO풋살장 A코트',
    matchTime: '2025-08-15T19:00:00Z',
    maxPlayers: 10,
    matchStatus: 'OPEN',
    createdBy: 1,
    createdAt: '2025-08-01T12:34:56Z',
    currentPlayers: 7, // 계산된 값
  },
  {
    id: 2,
    location: '부산 XX풋살파크 B코트',
    matchTime: '2025-08-16T08:00:00Z',
    maxPlayers: 8,
    matchStatus: 'OPEN',
    createdBy: 1,
    createdAt: '2025-08-02T09:15:00Z',
    currentPlayers: 5,
  },
  {
    id: 3,
    location: '대구 YY스포츠센터',
    matchTime: '2025-08-17T14:00:00Z',
    maxPlayers: 12,
    matchStatus: 'FULL',
    createdBy: 1,
    createdAt: '2025-08-03T10:20:00Z',
    currentPlayers: 12,
  },
];

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: mockMatches,

  setMatches: (matches: Match[]) => {
    set({ matches });
  },

  addMatch: (match: Match) => {
    const { matches } = get();
    set({ matches: [...matches, match] });
  },

  removeMatch: (matchId: number) => {
    const { matches } = get();
    set({ matches: matches.filter((match) => match.id !== matchId) });
  },

  updateMatchParticipants: (matchId: number, currentPlayers: number) => {
    const { matches } = get();
    const updatedMatches = matches.map((match) => {
      if (match.id === matchId) {
        const updatedMatch = { ...match, currentPlayers };
        // 자동으로 상태 업데이트
        if (currentPlayers >= match.maxPlayers) {
          updatedMatch.matchStatus = 'FULL';
        } else if (updatedMatch.matchStatus === 'FULL') {
          updatedMatch.matchStatus = 'OPEN';
        }
        return updatedMatch;
      }
      return match;
    });
    set({ matches: updatedMatches });
  },

  updateMatchStatus: (matchId: number, status: Match['matchStatus']) => {
    const { matches } = get();
    set({
      matches: matches.map((match) =>
        match.id === matchId ? { ...match, matchStatus: status } : match,
      ),
    });
  },
}));
