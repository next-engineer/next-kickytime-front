import { useEffect } from 'react';
import { fetchAllMatches, fetchMyMatches } from '../api/matchApi';
import { useMatchStore } from '../store/useMatchStore';

export default function useLoadMatches() {
  const { setMatches, setJoined } = useMatchStore();

  useEffect(() => {
    (async () => {
      const [all, mine] = await Promise.all([fetchAllMatches(), fetchMyMatches()]);

      const myIds = mine.map((m) => m.id as number);
      setJoined(myIds);

      // isJoined 주입
      setMatches(
        all.map((m) => ({
          ...m,
          isJoined: myIds.includes(m.id as number),
        })),
      );
    })();
  }, [setMatches, setJoined]);
}
