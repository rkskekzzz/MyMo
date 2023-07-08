import { useEffect } from 'react';
import { useQuery as useRealmQuery } from '@realm/react';
import { Note } from 'models';
import { useQuery } from '@tanstack/react-query';
import { NoteController } from 'api';
import { useRealm } from '@realm/react';
import useStatus from './useStatus';

const useNoteList = () => {
  const { dispatch } = useStatus();
  const localNoteList = useRealmQuery(Note);
  const filteredNoteList = localNoteList.filter((note) => note.deletedAt === null);
  const sortedNoteList = filteredNoteList.sort((a, b) => {
    if (a.updatedAt === b.updatedAt) return 0;
    return a.updatedAt > b.updatedAt ? -1 : 1;
  });

  const realm = useRealm();
  const { isFetching } = useQuery({
    queryKey: ['noteList'],
    queryFn: () => {
      return NoteController.getAll();
    },
    onSuccess: (serverNoteList) => {
      if (!serverNoteList) return;
      syncAll(serverNoteList);
    },
    refetchInterval: 10000
  });

  const syncAll = async (serverNoteList: Note[]) => {
    serverNoteList.forEach((serverNote) => {
      if (serverNote.deletedAt) return;
      const localNote = localNoteList.find((note) => note._id === serverNote._id);
      if (!localNote) {
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
      }
    });
  };

  useEffect(() => {
    dispatch({ type: 'SET_IS_SYNCING', isSyncing: isFetching });
  }, [isFetching]);

  useEffect(() => {
    dispatch({ type: 'SET_COUNT', newCount: filteredNoteList.length });
  }, [localNoteList]);

  return { localNoteList, sortedNoteList };
};

export default useNoteList;
