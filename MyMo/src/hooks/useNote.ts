import { useEffect, useState } from 'react';
import { useObject, useRealm } from '@realm/react';
import { Note } from 'models';
import { NoteController } from 'api';
import { onlineManager, useMutation, useQuery } from '@tanstack/react-query';
import useStatus from './useStatus';
import type { ConflictStatus, ConflictStatusWithOrder } from 'interface';

const useNote = () => {
  const realm = useRealm();
  const [conflictStatus, setConflictStatus] = useState<ConflictStatus>('NoConflict');
  const { state, dispatch } = useStatus();
  const note_id = state.note?._id ?? '';
  const localNote = useObject(Note, note_id);
  const {
    isLoading,
    isError,
    data: serverNote
  } = useQuery({
    queryKey: ['note', note_id],
    queryFn: () => NoteController.getOne(note_id)
  });
  const updateNoteSyncedAt = (data: Note) => {
    const note = localNote;
    if (note) {
      realm.write(() => {
        note.syncedAt = data.syncedAt;
        console.log(note.syncedAt);
      });
    }
  };
  const createMutation = useMutation({
    mutationFn: NoteController.create,
    onSuccess: updateNoteSyncedAt
  });
  const updateMutation = useMutation({
    mutationFn: NoteController.update,
    onSuccess: updateNoteSyncedAt
  });
  const removeMutation = useMutation({
    mutationFn: NoteController.remove,
    onSuccess: updateNoteSyncedAt
  });

  const create = () => {
    const note = Note.generate();

    if (note) {
      realm.write(() => {
        const newNote = realm.create<Note>('Note', note);
        dispatch({ type: 'SET_NOTE', newNote });
      });
      createMutation.mutate({ ...note });
    }
  };

  const update = (title: string, content: string) => {
    const note = state.note;
    const now = new Date();

    if (note) {
      realm.write(() => {
        note.updatedAt = now;
        note.title = title;
        note.content = content;
      });
      updateMutation.mutate({ _id: note._id, title, content, updatedAt: now });
    }
  };

  const remove = () => {
    const note = state.note;
    const now = new Date();

    if (note) {
      realm.write(() => {
        note.deletedAt = now;
      });
      removeMutation.mutate({ _id: note._id, deletedAt: now });
    }
  };

  // const syncOne = () => {
  //   // 편집중일땐 동기화 중지
  //   if (updateMutation.isLoading || removeMutation.isLoading) return;
  //   // 이미 충돌이 발생했으면 중지
  //   if (conflictStatus !== 'NoConflict') return;

  //   // 온라인 체크
  //   if (onlineManager.isOnline()) {
  //     // 서버에 업로드 안된건 바로 업로드 - syncedAt이 없으면 서버에 없음 -> create 메소드 호출 후 syncedAt 동기화
  //     if (localNote && localNote.syncedAt === null) {
  //       // 여기서 create 실패하는 경우 = 이전 create 호출 당시 응답을 못받은 경우 -> update를 호출해주면 해결
  //       NoteController.create({ ...localNote });
  //       return;
  //     }
  //     // 충돌상태인지 체크
  //     if (serverNote && localNote) {
  //       /**
  //        * 충돌 상태 정리
  //        * 1. 로컬 변경사항이 서버보다 많음 -> crash / 로컬 선택시 서버로 업데이트
  //        * 2. 서버 변경사항이 로컬보다 많음 -> crash / 서버 선택시 로컬 업데이트
  //        * 3. 둘다 삭제되었지만 삭제 시간만 다른 경우 ->
  //        * ㄴ 최근 시간으로 싱크 맞추기
  //        * 3. 로컬은 삭제, 서버는 삭제되지 않음 -> serverNote.deletedAt !== null
  //        * ㄴ 서버에 remove 요청 보내기
  //        * 4. 서버는 삭제, 로컬은 삭제되지 않음 -> localNote.deletedAt !== null
  //        * ㄴ 로컬 remove 하기
  //        */
  //       switch (getConflictStatus(serverNote, localNote)) {
  //         // delete는 자동으로 처리
  //         case 'DeleteConflictBoth':
  //           break;
  //         case 'DeleteConflictLocal':
  //           break;
  //         case 'DeleteConflictServer':
  //           break;
  //         // update는 유저 선택
  //         case 'UpdateConflict':
  //           break;
  //         case 'NoConflict':
  //           break;
  //         default:
  //           break;
  //       }
  //     } else {
  //       setConflictStatus('NoConflict');
  //     }
  //   }
  // };

  // const getConflictStatus = (localNote: Note, serverNote: Note): ConflictStatusWithOrder => {
  //   if (serverNote.syncedAt === localNote.syncedAt) return 'NoConflict';
  //   // 노트가 삭제된 경우
  //   if (
  //     !localNote.deletedAt !== null &&
  //     !serverNote.deletedAt !== null &&
  //     localNote.deletedAt !== serverNote.deletedAt
  //   ) {
  //     return 'DeleteConflictBoth';
  //   } else if (localNote.deletedAt !== null && serverNote.deletedAt === null) {
  //     return 'DeleteConflictServer';
  //   } else if (localNote.deletedAt === null && serverNote.deletedAt !== null) {
  //     return 'DeleteConflictLocal';
  //   }
  //   // 노트가 변경된 경우
  //   return 'UpdateConflict';
  // };

  return { create, update, remove };
};

export default useNote;
