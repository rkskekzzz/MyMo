import { useEffect } from 'react';
import { useQuery as useRealmQuery } from '@realm/react';
import { Note } from 'models';
import { useQuery } from '@tanstack/react-query';
import { NoteController } from 'api';
import { onlineManager } from '@tanstack/react-query';
import { getTime } from 'utils';
import { useRealm } from '@realm/react';
import useStatus from './useStatus';

const byIsDeleted = (note: Note) => note.deletedAt === null;
const byUpdatedAt = (a: Note, b: Note) => {
  if (a.updatedAt === b.updatedAt) return 0;
  return a.updatedAt > b.updatedAt ? -1 : 1;
};

const useNoteList = () => {
  const { dispatch } = useStatus();
  const localNoteList = useRealmQuery(Note);
  const filteredNoteList = localNoteList.filter(byIsDeleted);
  const sortedNoteList = filteredNoteList.sort(byUpdatedAt);

  const realm = useRealm();
  const queryEnabled = onlineManager.isOnline();
  const queryKey = queryEnabled ? ['noteList'] : [];
  const queryFn = queryEnabled ? () => NoteController.getAll() : () => null;
  const syncAll = async (serverNoteList: Note[] | null) => {
    if (!serverNoteList) return;
    const idList = Array.from(
      new Set([...localNoteList.map((note) => note._id), ...serverNoteList.map((note) => note._id)])
    );
    idList.forEach((id) => {
      const localNote = localNoteList.find((note) => note._id === id);
      const serverNote = serverNoteList.find((note) => note._id === id);
      // 서버에도 없고 로컬에도 없는 노트는 무시
      if (!localNote && !serverNote) return;
      // 서버에는 있고 로컬에는 없는 노트는 로컬에 생성
      if (!localNote && serverNote) {
        realm.write(() => {
          realm.create('Note', {
            _id: serverNote._id,
            title: serverNote.title,
            content: serverNote.content,
            createdAt: serverNote.createdAt,
            updatedAt: serverNote.updatedAt,
            syncedAt: serverNote.syncedAt
          });
        });
        return;
      }
      // 서버에는 없고 로컬에는 있는 노트는 서버에 생성
      if (localNote && !serverNote) {
        NoteController.create(localNote).then((response) => {
          if (response) {
            realm.write(() => {
              localNote.syncedAt = response.syncedAt;
            });
          }
        });
        return;
      }
      // 서버에도 있고 로컬에도 있는 노트는 updateAt 비교 후 업데이트
      if (localNote && serverNote) {
        if (getTime(localNote.updatedAt) > getTime(serverNote.updatedAt)) {
          NoteController.update(localNote).then((response) => {
            if (response) {
              realm.write(() => {
                localNote.syncedAt = response.syncedAt;
              });
            }
          });
        } else if (getTime(localNote.updatedAt) < getTime(serverNote.updatedAt)) {
          realm.write(() => {
            localNote.title = serverNote.title;
            localNote.content = serverNote.content;
            localNote.updatedAt = serverNote.updatedAt;
            localNote.syncedAt = serverNote.syncedAt;
            localNote.deletedAt = serverNote.deletedAt;
          });
        }
        return;
      }
    });
  };
  const { isFetching } = useQuery({
    queryKey,
    queryFn,
    onSuccess: syncAll,
    refetchInterval: 10000
  });

  useEffect(() => {
    dispatch({ type: 'SET_IS_SYNCING', isSyncing: isFetching });
  }, [isFetching]);

  useEffect(() => {
    dispatch({ type: 'SET_COUNT', newCount: filteredNoteList.length });
  }, [localNoteList]);

  return { localNoteList, sortedNoteList };
};

export default useNoteList;
