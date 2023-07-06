import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Task } from '../../models/Memo';

export type RootStackParamList = {
  memos: undefined;
  memo: { task: Task };
};

export type StackScreenProps = NativeStackScreenProps<RootStackParamList, 'memos' | 'memo'>;
