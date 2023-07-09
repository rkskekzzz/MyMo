import { useRealm } from '@realm/react';
import { useMutation } from '@tanstack/react-query';
import { NoteController } from 'api';
import type { Note } from 'models';
import { useCallback } from 'react';

const useMutations = (localNote: Note | null) => {
  const realm = useRealm();
  const updateLocalNoteSyncedAt = useCallback(
    (data: Note | undefined) => {
      const note = localNote;
      realm.write(() => {
        if (note && data && data.syncedAt) {
          note.syncedAt = data.syncedAt;
        }
      });
    },
    [localNote]
  );
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

  const isMutating =
    createMutation.isLoading || updateMutation.isLoading || removeMutation.isLoading;

  return {
    createMutation,
    updateMutation,
    removeMutation,
    isMutating
  };
};

export default useMutations;
