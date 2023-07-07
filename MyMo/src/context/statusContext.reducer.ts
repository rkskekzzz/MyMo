import type { State, Action } from './statusContext.type';

const statusContextReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_MEMO':
      return { ...state, memo: action.newMemo };
    case 'SET_COUNT':
      return { ...state, count: action.newCount };
    case 'SET_IS_SYNCING':
      return { ...state, isSyncing: action.isSyncing };
    case 'CLEAR_MEMO':
      return { ...state, memo: null };
    case 'TO_EDIT_MODE':
      return { ...state, isEdit: true };
    case 'TO_READ_MODE':
      return { ...state, isEdit: false };
    default:
      return state;
  }
};

export default statusContextReducer;
