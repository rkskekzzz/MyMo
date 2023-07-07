import type { Memo } from '../models/Memo';

export type State = {
  task: Memo | null;
  isEdit: boolean;
};

export type Action =
  | { type: 'SET_TASK'; newTask: Memo }
  | { type: 'UPDATE_TASK'; newContent: string; updateAt: Date }
  | { type: 'CLEAR_TASK' }
  | { type: 'TO_EDIT_MODE' }
  | { type: 'TO_READ_MODE' };
