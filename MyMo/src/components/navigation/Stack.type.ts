import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  memos: undefined;
  memo: undefined;
};

export type StackScreenProps = NativeStackScreenProps<RootStackParamList, 'memos' | 'memo'>;
