import { onlineManager } from '@tanstack/react-query';
import useStatus from './useStatus';
import { useObject } from '@realm/react';
import { Note } from 'models';
import { NoteController } from 'api';
import { useQuery } from '@tanstack/react-query';

const useSyncOne = () => {
  const { state } = useStatus();
  const note_id = state.note?._id ?? '';
  const noteByLocal = useObject(Note, note_id);
  const {
    isLoading,
    isError,
    data: noteByServer
  } = useQuery({
    queryKey: ['note', note_id],
    queryFn: () => NoteController.getOne(note_id)
  });
};

export default useSyncOne;
