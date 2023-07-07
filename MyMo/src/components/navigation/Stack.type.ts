import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MemoListView: undefined;
  MemoView: undefined;
};

export type StackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MemoListView' | 'MemoView'
>;
