import { useState, useEffect } from 'react';
import { useQuery } from '@realm/react';
import useStatus from './useStatus';
import { Memo } from 'models';

const useNotes = () => {
  const { dispatch } = useStatus();
  const memosByLocal = useQuery(Memo);
  const [filteredMemos, setFilteredMemos] = useState<Memo[]>([]);
  useEffect(() => {
    setFilteredMemos(
      memosByLocal.filter((memo) => {
        memo.deletedAt !== null;
      })
    );
  }, [memosByLocal]);

  useEffect(() => {
    if (filteredMemos) dispatch({ type: 'SET_COUNT', newCount: filteredMemos.length });
  }, [filteredMemos]);
};

export default useNotes;
