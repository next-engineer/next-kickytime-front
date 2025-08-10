import { create } from 'zustand';

type AppState = {
  count: number;
  inc: () => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 }),
}));
