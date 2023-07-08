import { styled } from 'styled-components/native';
import { View } from 'react-native';
import { getColorByTheme } from 'utils';

const NoteListViewContainer = styled.SafeAreaView`
  background: ${({ theme }) => getColorByTheme(theme).background};
  flex: 1;
`;

const NoteList = styled(View)`
  padding: 20px;
  padding-bottom: 60px;
  gap: 10px;
  height: 100%;
`;

const NoteListItem = styled.TouchableOpacity`
  background: ${({ theme }) => getColorByTheme(theme).secondary};
  border-radius: 10px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px 20px;
  margin: 5px 0;
`;

export { NoteListViewContainer, NoteList, NoteListItem };
