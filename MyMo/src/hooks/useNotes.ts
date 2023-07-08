import { useState, useEffect } from 'react';
import { useQuery } from '@realm/react';
import useStatus from './useStatus';
import { Note } from 'models';

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
