import { FlatList } from 'react-native';
import { t } from 'i18next';
import { Txt } from 'components/Txt';
import { useStatus, useNoteList } from 'hooks';
import { formatDate } from 'utils';
import { Footer } from '../footer';
import { NoteListViewContainer, NoteList, NoteListItem } from './NoteListView.styled';
import type { Note } from 'models';
import type { StackScreenProps } from '../navigation';

const NoteListView = ({ navigation }: StackScreenProps) => {
  const { dispatch } = useStatus();
  const { sortedNoteList } = useNoteList();

  const renderItem = ({ item }: { item: Note }) => {
    return (
      <NoteListItem
        onPress={() => {
          dispatch({ type: 'SET_NOTE', newNote: item });
          navigation.navigate('NoteView');
        }}
      >
        <Txt fontWeight="bold" fontSize="md">
          {item.title.length === 0 ? t('note-list-view.note.title.placeholder') : item.title}
        </Txt>
        <Txt numberOfLines={1} ellipsizeMode="tail" color="secondary" fontSize="sm">{`${formatDate(
          item.updatedAt
        )} ${item.content}`}</Txt>
      </NoteListItem>
    );
  };

  return (
    <NoteListViewContainer>
      <NoteList>
        <Txt fontSize="lg" fontWeight="bold">
          {t('note-list-view.title')}
        </Txt>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortedNoteList}
          renderItem={renderItem}
        />
      </NoteList>
      <Footer mode="NoteListView" />
    </NoteListViewContainer>
  );
};

export default NoteListView;
