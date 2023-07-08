import { useEffect } from 'react';
import { useQuery } from '@realm/react';
import { Note } from 'models';
import useStatus from './useStatus';

const useNotes = () => {
  const { dispatch } = useStatus();
  const notesByLocal = useQuery(Note);
  const filteredNotes = notesByLocal.filter((note) => note.deletedAt === null);

  useEffect(() => {
    dispatch({ type: 'SET_COUNT', newCount: filteredNotes.length });
  }, [notesByLocal]);

  return { filteredNotes };
};

export default useNotes;
