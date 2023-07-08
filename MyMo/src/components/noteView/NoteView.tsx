import { useMemo } from 'react';
import { Footer } from '../footer';
import { useNote, useNoteSync } from 'hooks';
import NoteConflictView from './NoteConflictView';
import NoteDefaultView from './NoteDefaultView';
import { NoteViewContainer, SafeAreaNoteView } from './NoteView.styled';

const NoteView = () => {
  const { localNote, update, removeAlert } = useNote();
  const { serverNote, conflictStatus, forceSyncToLocal, forceSyncToServer } = useNoteSync(
    localNote,
    removeAlert
  );

  const isConflict = useMemo(() => {
    if (conflictStatus === 'NoConflict' || conflictStatus === 'DeleteConflictBoth') return false;
    return true;
  }, [conflictStatus]);

  return (
    <SafeAreaNoteView>
      <NoteViewContainer>
        {isConflict && localNote && serverNote ? (
          <NoteConflictView
            localNote={localNote}
            serverNote={serverNote}
            forceSyncToLocal={forceSyncToLocal}
            forceSyncToServer={forceSyncToServer}
          />
        ) : (
          <NoteDefaultView update={update} />
        )}
      </NoteViewContainer>
      <Footer mode="NoteView" />
    </SafeAreaNoteView>
  );
};

export default NoteView;
