import { useEffect } from 'react';
import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useStatus, useNotes } from 'hooks';
import { t } from 'i18next';
import type { StackScreenProps } from '../navigation';

const StyledView = styled.View`
  flex: 1;
`;
const StyledText = styled.Text``;

const NoteListView = ({ navigation }: StackScreenProps) => {
  const { dispatch } = useStatus();
  const { filteredNotes } = useNotes();

  return (
    <StyledView>
      {filteredNotes.map((note, index) => {
        return (
          <StyledText
            key={index}
            onPress={() => {
              dispatch({ type: 'SET_NOTE', newNote: note });
              navigation.navigate('NoteView');
            }}
          >
            {note.title.length === 0 ? t('note-list-view.note.title.placeholder') : note.title}
          </StyledText>
        );
      })}
      <Footer mode="NoteListView" />
    </StyledView>
  );
};

export default NoteListView;
