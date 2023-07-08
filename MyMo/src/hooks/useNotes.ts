import { useState, useEffect } from 'react';
import { useQuery } from '@realm/react';
import useStatus from './useStatus';
import { Note } from 'models';

const useNotes = () => {
  const { dispatch } = useStatus();
  const notesByLocal = useQuery(Note);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    setFilteredNotes(
      notesByLocal.filter((note) => {
        note.deletedAt !== null;
      })
    );
  }, [notesByLocal]);

  useEffect(() => {
    if (filteredNotes) dispatch({ type: 'SET_COUNT', newCount: filteredNotes.length });
  }, [filteredNotes]);

  return { filteredNotes };
};

export default useNotes;
