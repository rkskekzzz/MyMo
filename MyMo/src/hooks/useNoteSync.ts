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
  const { data: serverNote, isFetching } = useQuery({
    queryKey,
    queryFn,
    onSuccess: (serverNote) => {
      if (!serverNote) return;
      syncOne(serverNote);
    },
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

  const syncOne = async (serverNote?: Note) => {
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

  const getConflictStatus = (localNote: Note, serverNote: Note): ConflictStatus => {
    /**
     * 충돌 상태 정리
     * 1. 로컬 변경사항이 서버보다 많음 -> crash / 로컬 선택시 서버로 업데이트
     * 2. 서버 변경사항이 로컬보다 많음 -> crash / 서버 선택시 로컬 업데이트
     * 3. 둘다 삭제되었지만 삭제 시간만 다른 경우 ->
     * ㄴ 최근 시간으로 싱크 맞추기
     * 3. 로컬은 삭제, 서버는 삭제되지 않음 -> serverNote.deletedAt !== null
     * ㄴ 서버에 remove 요청 보내기
     * 4. 서버는 삭제, 로컬은 삭제되지 않음 -> localNote.deletedAt !== null
     * ㄴ 로컬 remove 하기
     */
    console.log(localNote.syncedAt);
    console.log(serverNote.syncedAt);
    if (
      localNote.syncedAt &&
      serverNote.syncedAt &&
      getTime(localNote.syncedAt) === getTime(serverNote.syncedAt)
    )
      return 'NoConflict';
    // 노트가 삭제된 경우
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
    // 노트가 변경된 경우
    return 'UpdateConflict';
  };

  const forceSyncToServer = () => {
    if (!localNote) return;
    const { _id, title, content, deletedAt, updatedAt } = localNote;
    if (conflictStatus === 'DeleteConflictServer') {
      // 불가능
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
