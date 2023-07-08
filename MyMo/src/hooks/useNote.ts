import { useEffect, useState } from 'react';
import { useObject, useRealm } from '@realm/react';
import { Note } from 'models';
import { NoteController } from 'api';
import { onlineManager, useMutation, useQuery } from '@tanstack/react-query';
import useStatus from './useStatus';
import type { ConflictStatus } from 'interface';

const useNote = () => {
  const realm = useRealm();
  const { state, dispatch } = useStatus();
  const localNote = useObject(Note, state.note?._id ?? '');

  const create = () => {
    const note = Note.generate();

    if (note) {
      realm.write(() => {
        const newNote = realm.create<Note>('Note', note);
        dispatch({ type: 'SET_NOTE', newNote });
      });
      // createMutation.mutate({ ...note });
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
      // updateMutation.mutate({ _id: localNote._id, title, content, updatedAt: now });
    }
  };

  const remove = () => {
    const now = new Date();

    if (localNote) {
      realm.write(() => {
        localNote.deletedAt = now;
      });
      // removeMutation.mutate({ _id: localNote._id, deletedAt: now });
    }
  };

  return { localNote, create, update, remove };
};

export default useNote;
