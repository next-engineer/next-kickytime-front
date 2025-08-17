import { create } from 'zustand';
import type { Match } from '../types';

interface MatchState {
  matches: Match[];
  joinedIds: number[];
  setJoined(ids: number[]): void;
  setMatches: (matches: Match[]) => void; // matches -> _matches
  addMatch: (match: Match) => void; // match -> _match
  removeMatch: (matchId: number) => void; // matchId -> _matchId
  updateMatchParticipants: (matchId: number, currentPlayers: number) => void;
  updateMatchStatus: (matchId: number, _status: Match['matchStatus']) => void;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],

  joinedIds: [],

  setJoined: (ids) => set({ joinedIds: ids }),

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

  updateMatchParticipants: (id, d) =>
    set((s) => ({
      matches: s.matches.map((m) =>
        m.id === id ? { ...m, currentPlayers: (m.currentPlayers ?? 0) + d } : m,
      ),
    })),

  updateMatchStatus: (matchId: number, status: Match['matchStatus']) => {
    const { matches } = get();
    set({
      matches: matches.map((match) =>
        match.id === matchId ? { ...match, matchStatus: status } : match,
      ),
    });
  },
}));
