import { Note } from 'models';
import { useRealm } from '@realm/react';
import { useMutation } from '@tanstack/react-query';
import { NoteController } from 'api';

const useMutations = (localNote: Note | null) => {
  const realm = useRealm();
  const updateLocalNoteSyncedAt = (data: Note) => {
    const note = localNote;
    if (note) {
      realm.write(() => {
        if (data.syncedAt) {
          console.log(data.syncedAt);
          note.syncedAt = data.syncedAt;
        }
      });
    }
  };
  const createMutation = useMutation({
    mutationFn: NoteController.create,
    onSuccess: updateLocalNoteSyncedAt
  });
  const updateMutation = useMutation({
    mutationFn: NoteController.update,
    onSuccess: updateLocalNoteSyncedAt
  });
  const removeMutation = useMutation({
    mutationFn: NoteController.remove,
    onSuccess: updateLocalNoteSyncedAt
  });

  return {
    createMutation,
    updateMutation,
    removeMutation,
    isMutating: createMutation.isLoading || updateMutation.isLoading || removeMutation.isLoading
  };
};

export default useMutations;
