import type { Note } from '../models/Note';

export type State = {
  note: Note | null;
  isEdit: boolean;
  isSyncing: boolean;
  count: number;
};

export type Action =
  | { type: 'SET_NOTE'; newNote: Note }
  | { type: 'SET_COUNT'; newCount: number }
  | { type: 'SET_IS_SYNCING'; isSyncing: boolean }
  | { type: 'UPDATE_NOTE'; newContent: string; updateAt: Date }
  | { type: 'CLEAR_NOTE' }
  | { type: 'TO_EDIT_MODE' }
  | { type: 'TO_READ_MODE' };
