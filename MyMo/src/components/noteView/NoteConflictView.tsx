import { Note } from 'models';
import React from 'react';
import { styled } from 'styled-components/native';

const StyledBtnText = styled.Text``;
const StyledNoteText = styled.Text``;

const StyledView = styled.View`
  flex: 1;
`;
const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

const StyledTouchableOpacity = styled.TouchableOpacity``;

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
    <StyledView>
      <StyledScrollView>
        <StyledNoteText>{localNote.title}</StyledNoteText>
        <StyledNoteText>{localNote.content}</StyledNoteText>
        <StyledTouchableOpacity onPress={forceSyncToServer}>
          <StyledBtnText>로컬 메모 선택</StyledBtnText>
        </StyledTouchableOpacity>
      </StyledScrollView>
      <StyledScrollView>
        <StyledNoteText>{serverNote.title}</StyledNoteText>
        <StyledNoteText>{serverNote.content}</StyledNoteText>
        <StyledTouchableOpacity onPress={forceSyncToLocal}>
          <StyledBtnText>서버 메모 선택</StyledBtnText>
        </StyledTouchableOpacity>
      </StyledScrollView>
    </StyledView>
  );
};

export default NoteConflictView;
