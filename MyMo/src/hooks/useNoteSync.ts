import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRealm } from '@realm/react';
import { CreateNoteDTO, Note } from 'models';
import { NoteController } from 'api';
import { getTime } from 'utils';
import type { ConflictStatus } from 'interface';

const useNoteSync = (localNote: Note | null) => {
  const realm = useRealm();
  const [conflictStatus, setConflictStatus] = useState<ConflictStatus>('NoConflict');
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

  const queryKey = localNote?.syncedAt ? ['note', localNote._id] : undefined;
  const queryFn = localNote?.syncedAt ? () => NoteController.getOne(localNote._id) : undefined;
  const {
    data: serverNote,
    isLoading,
    isError
  } = useQuery({
    queryKey,
    queryFn,
    onSuccess: (serverNote) => syncOne(serverNote),
    refetchInterval: 1000
  });

  useEffect(() => {
    if (localNote && localNote?.syncedAt === null) {
      createMutation.mutate({
        _id: localNote._id,
        title: localNote.title,
        content: localNote.content,
        createdAt: localNote.createdAt,
        updatedAt: localNote.updatedAt
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
        updatedAt: localNote.updatedAt
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
      removeMutation.mutate({ _id, deletedAt });
    } else {
      updateMutation.mutate({ _id, title, content, updatedAt });
    }
    setConflictStatus('NoConflict');
  };

  const forceSyncToLocal = () => {
    if (!localNote || !serverNote) return;
    const { title, content, deletedAt, updatedAt } = serverNote;
    if (conflictStatus === 'DeleteConflictLocal') {
      realm.write(() => {
        localNote.deletedAt = deletedAt;
      });
    } else {
      realm.write(() => {
        localNote.title = title;
        localNote.content = content;
        localNote.updatedAt = updatedAt;
      });
    }
    setConflictStatus('NoConflict');
  };

  return { conflictStatus, serverNote, forceSyncToServer, forceSyncToLocal };
};

export default useNoteSync;
