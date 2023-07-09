import { styled } from 'styled-components/native';
import { getColorByTheme } from 'utils';
import { TextInput } from 'react-native';

const NoteViewTextInputTitle = styled(TextInput)`
  color: ${({ theme }) => getColorByTheme(theme).text.secondary};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => getColorByTheme(theme).text.disabled};
  font-size: 24px;
`;

const NoteViewTextInput = styled(TextInput)`
  font-size: 16px;
  /* background-color: whit */
  padding-bottom: 40px;
  color: ${({ theme }) => getColorByTheme(theme).text.secondary};
`;

const SafeAreaNoteView = styled.View`
  background-color: ${({ theme }) => getColorByTheme(theme).backgroundNote};
  flex: 1;
`;

const NoteViewContainer = styled.View`
  flex: 1;
  gap: 5px;
  padding: 20px;
  padding-bottom: 80px;
`;

const NoteViewConflictButton = styled.TouchableOpacity`
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
  position: absolute;
  border-radius: 12px;
  background-color: ${({ theme }) => getColorByTheme(theme).primary};
`;

const NoteViewConflictTop = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => getColorByTheme(theme).text.disabled + '40'};
`;

const NoteViewConflictBottom = styled.View`
  flex: 1;
`;

const NoteViewConflictScrollView = styled.ScrollView`
  flex: 1;
`;

export {
  NoteViewContainer,
  SafeAreaNoteView,
  NoteViewTextInput,
  NoteViewTextInputTitle,
  NoteViewConflictButton,
  NoteViewConflictTop,
  NoteViewConflictBottom,
  NoteViewConflictScrollView
};
