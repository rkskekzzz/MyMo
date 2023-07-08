import { useEffect, useMemo, useRef } from 'react';
import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useStatus, useInput, useDebounce, useNote, useNoteSync } from 'hooks';
import { TextInput } from 'react-native';
import NoteConflictView from './NoteConflictView';
import NoteDefaultView from './NoteDefaultView';

const StyledView = styled.ScrollView`
  flex: 1;
`;
// const StyledText = styled.Text``;
const StyledTextInput = styled(TextInput)``;

const NoteView = () => {
  const { localNote, update } = useNote();
  const { serverNote, conflictStatus, forceSyncToLocal, forceSyncToServer } =
    useNoteSync(localNote);

  const isConflict = useMemo(() => {
    if (conflictStatus === 'NoConflict' || conflictStatus === 'DeleteConflictBoth') return false;
    return true;
  }, [conflictStatus]);

  return (
    <>
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
      <Footer mode="NoteView" />
    </>
  );
};

export default NoteView;
