import { useEffect } from 'react';
import { useQuery } from '@realm/react';
import { Note } from 'models';
import useStatus from './useStatus';

const useNotes = () => {
  const { dispatch } = useStatus();
  const notesByLocal = useQuery(Note);
  const filteredNotes = notesByLocal.filter((note) => note.deletedAt === null);
  const sortedNotes = filteredNotes.sort((a, b) => {
    if (a.updatedAt === b.updatedAt) return 0;
    return a.updatedAt > b.updatedAt ? -1 : 1;
  });

  useEffect(() => {
    dispatch({ type: 'SET_COUNT', newCount: filteredNotes.length });
  }, [notesByLocal]);

  return { sortedNotes };
};

export default useNotes;
