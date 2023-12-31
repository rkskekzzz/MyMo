import { useObject, useRealm } from '@realm/react';
import { Note } from 'models';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import useNavigation from './useNavigation';
import useStatus from './useStatus';
import useMutations from './useMutations';

const useNote = () => {
  const realm = useRealm();
  const { t } = useTranslation();
  const { state, dispatch } = useStatus();
  const { goBack, toNoteView } = useNavigation();
  const localNote = useObject(Note, state.note?._id ?? '');
  const { removeMutation } = useMutations(localNote);

  const create = () => {
    toNoteView();
    const note = Note.generate();

    if (note) {
      realm.write(() => {
        const newNote = realm.create<Note>('Note', note);
        dispatch({ type: 'SET_NOTE', newNote });
      });
    }
  };

  const update = (title: string, content: string) => {
    const now = new Date();

    if (localNote) {
      realm.write(() => {
        localNote.updatedAt = now;
        localNote.title = title;
        localNote.content = content;
      });
    }
  };

  const remove = () => {
    const now = new Date();

    if (localNote) {
      realm.write(() => {
        localNote.deletedAt = now;
      });
      removeMutation.mutate(localNote);
    }
  };

  const removeAlert = (callback: () => void) => {
    Alert.alert(t('alert.delete.title'), t('alert.delete.description'), [
      {
        text: t('alert.delete.cancel'),
        style: 'destructive'
      },
      {
        text: t('alert.delete.ok'),
        onPress: () => {
          goBack();
          callback();
          dispatch({ type: 'CLEAR_NOTE' });
        }
      }
    ]);
  };

  return { localNote, create, update, remove, removeAlert };
};

export default useNote;
