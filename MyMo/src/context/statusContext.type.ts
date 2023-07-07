import type { Memo } from '../models/Memo';

export type State = {
  memo: Memo | null;
  isEdit: boolean;
  isSyncing: boolean;
  count: number;
};

export type Action =
  | { type: 'SET_MEMO'; newMemo: Memo }
  | { type: 'SET_COUNT'; newCount: number }
  | { type: 'SET_IS_SYNCING'; isSyncing: boolean }
  | { type: 'UPDATE_MEMO'; newContent: string; updateAt: Date }
  | { type: 'CLEAR_MEMO' }
  | { type: 'TO_EDIT_MODE' }
  | { type: 'TO_READ_MODE' };
