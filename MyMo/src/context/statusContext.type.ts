import type { Task } from '../models/Memo';

export type State = {
  task: Task | null;
  isEdit: boolean;
};

export type Action = //\

    | { type: 'SET_TASK'; newTask: Task } //
    | { type: 'CLEAR_TASK' } //
    | { type: 'SET_IS_EDIT'; newIsEdit: boolean };
