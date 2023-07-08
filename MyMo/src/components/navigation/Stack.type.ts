import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  NoteListView: undefined;
  NoteView: undefined;
};

export type StackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NoteListView' | 'NoteView'
>;
