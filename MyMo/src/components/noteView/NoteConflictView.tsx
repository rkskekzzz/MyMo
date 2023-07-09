import {
  NoteViewConflictButton,
  NoteViewConflictTop,
  NoteViewConflictBottom,
  NoteViewConflictScrollView
} from './NoteView.styled';
import { t } from 'i18next';
import { Txt } from 'components/Txt';
import type { Note } from 'models';

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
          <Txt
            color="secondary"
            fontSize="lg"
            fontWeight="bold"
            textDecorLine={!!localNote.deletedAt ? 'line-through' : 'none'}
          >
            {localNote.title}
          </Txt>
          <Txt color="secondary" textDecorLine={!!localNote.deletedAt ? 'line-through' : 'none'}>
            {localNote.content}
          </Txt>
        </NoteViewConflictScrollView>
        <NoteViewConflictButton onPress={forceSyncToServer}>
          <Txt fontSize="sm" fontWeight="bold">
            {t('note-view.note.select-local')}
          </Txt>
        </NoteViewConflictButton>
      </NoteViewConflictTop>
      <NoteViewConflictBottom>
        <NoteViewConflictScrollView>
          <Txt
            color="secondary"
            fontSize="lg"
            fontWeight="bold"
            textDecorLine={!!serverNote.deletedAt ? 'line-through' : 'none'}
          >
            {serverNote.title}
          </Txt>
          <Txt color="secondary" textDecorLine={!!serverNote.deletedAt ? 'line-through' : 'none'}>
            {serverNote.content}
          </Txt>
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
