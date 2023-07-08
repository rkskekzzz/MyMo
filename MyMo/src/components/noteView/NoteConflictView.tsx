import React from 'react';
import {
  NoteViewConflictButton,
  NoteViewConflictTop,
  NoteViewConflictBottom,
  NoteViewConflictScrollView
} from './NoteView.styled';
import { Txt } from 'components/Txt';
import type { Note } from 'models';
import { t } from 'i18next';

type Props = {
  localNote: Note;
  serverNote: Note;
  forceSyncToLocal: () => void;
  forceSyncToServer: () => void;
};

const NoteConflictView = ({
  localNote,
  serverNote,
  forceSyncToLocal,
  forceSyncToServer
}: Props) => {
  return (
    <>
      <NoteViewConflictTop>
        <NoteViewConflictScrollView>
          <Txt color="secondary" fontSize="lg" fontWeight="bold">
            {localNote.title}
          </Txt>
          <Txt color="secondary">{localNote.content}</Txt>
        </NoteViewConflictScrollView>
        <NoteViewConflictButton onPress={forceSyncToServer}>
          <Txt fontSize="sm" fontWeight="bold">
            {t('note-view.note.select-local')}
          </Txt>
        </NoteViewConflictButton>
      </NoteViewConflictTop>
      <NoteViewConflictBottom>
        <NoteViewConflictScrollView>
          <Txt color="secondary" fontSize="lg" fontWeight="bold">
            {serverNote.title}
          </Txt>
          <Txt color="secondary">{serverNote.content}</Txt>
        </NoteViewConflictScrollView>
        <NoteViewConflictButton onPress={forceSyncToLocal}>
          <Txt fontSize="sm" fontWeight="bold">
            {t('note-view.note.select-remote')}
          </Txt>
        </NoteViewConflictButton>
      </NoteViewConflictBottom>
    </>
  );
};

export default NoteConflictView;
