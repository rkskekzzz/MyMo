import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRealm } from '@realm/react';
import { NoteController } from 'api';
import { getTime } from 'utils';
import useStatus from './useStatus';
import useMutations from './useMutations';
import { onlineManager } from '@tanstack/react-query';
import type { Note } from 'models';
import type { ConflictStatus } from 'interface';

const useNoteSync = (localNote: Note | null, removeAlert: (callback: () => void) => void) => {
  const realm = useRealm();
  const { dispatch } = useStatus();
  const { createMutation, updateMutation, removeMutation, isMutating } = useMutations(localNote);
  const [conflictStatus, setConflictStatus] = useState<ConflictStatus>('NoConflict');

  const queryEnabled = onlineManager.isOnline() && localNote?.syncedAt;
  const queryKey = queryEnabled ? ['note', localNote._id] : [];
  const queryFn = queryEnabled ? () => NoteController.getOne(localNote._id) : () => null;
  const syncOne = async (serverNote?: Note | null) => {
    if (!localNote || !serverNote || !localNote.syncedAt) return;
    if (createMutation.isLoading || updateMutation.isLoading || removeMutation.isLoading) return;
    if (conflictStatus !== 'NoConflict') return;
    const newConflictStatus = getConflictStatus(serverNote, localNote);
    if (
      newConflictStatus === 'NoConflict' &&
      getTime(localNote.updatedAt) > getTime(serverNote.updatedAt)
    ) {
      updateMutation.mutate({
        _id: localNote._id,
        title: localNote.title,
        content: localNote.content,
        updatedAt: localNote.updatedAt,
        deletedAt: localNote.deletedAt
      });
      return;
    }
    setConflictStatus(newConflictStatus);
  };
  const { data: serverNote, isFetching } = useQuery({
    queryKey,
    queryFn,
    onSuccess: syncOne,
    refetchInterval: 4000
  });

  useEffect(() => {
    dispatch({
      type: 'SET_IS_SYNCING',
      isSyncing: isFetching || isMutating || conflictStatus !== 'NoConflict'
    });
  }, [isFetching, isMutating, conflictStatus]);

  useEffect(() => {
    if (localNote && localNote?.syncedAt === null) {
      createMutation.mutate({
        _id: localNote._id,
        title: localNote.title,
        content: localNote.content,
        createdAt: localNote.createdAt,
        updatedAt: localNote.updatedAt,
        deletedAt: null
      });
    }
  }, [localNote]);

  const getConflictStatus = (localNote: Note, serverNote: Note): ConflictStatus => {
    // 확장성 고려한 충돌 타입 설정
    if (
      localNote.syncedAt &&
      serverNote.syncedAt &&
      getTime(localNote.syncedAt) === getTime(serverNote.syncedAt)
    )
      return 'NoConflict';
    if (
      localNote.deletedAt &&
      serverNote.deletedAt &&
      getTime(localNote.deletedAt) !== getTime(serverNote.deletedAt)
    ) {
      return 'DeleteConflictBoth';
    } else if (!localNote.deletedAt && serverNote.deletedAt) {
      return 'DeleteConflictServer';
    } else if (localNote.deletedAt && !serverNote.deletedAt) {
      return 'DeleteConflictLocal';
    }
    return 'UpdateConflict';
  };

  const forceSyncToServer = () => {
    if (!localNote) return;
    const { _id, title, content, deletedAt, updatedAt } = localNote;
    if (conflictStatus === 'DeleteConflictServer') {
      removeMutation.mutate({ _id, deletedAt });
    } else {
      updateMutation.mutate({ _id, title, content, updatedAt, deletedAt });
    }
    setConflictStatus('NoConflict');
  };

  const forceSyncToLocal = () => {
    if (!localNote || !serverNote) return;
    const { title, content, deletedAt, updatedAt, syncedAt } = serverNote;
    if (conflictStatus === 'DeleteConflictLocal') {
      // 삭제 경고 & 홈으로 이동
      removeAlert(() => {
        realm.write(() => {
          localNote.deletedAt = deletedAt;
        });
        setConflictStatus('NoConflict');
      });
    } else {
      realm.write(() => {
        localNote.title = title;
        localNote.content = content;
        localNote.updatedAt = updatedAt;
        localNote.syncedAt = syncedAt;
      });
      setConflictStatus('NoConflict');
    }
  };

  return { conflictStatus, serverNote, forceSyncToServer, forceSyncToLocal };
};

export default useNoteSync;
