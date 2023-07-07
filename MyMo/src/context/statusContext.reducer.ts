import type { State, Action } from './statusContext.type';

const statusContextReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_TASK':
      return { ...state, task: action.newTask };
    // case 'UPDATE_TASK':
    //   return { ...state, task: { ...state.task, ...action.newContent } }
    case 'CLEAR_TASK':
      return { ...state, task: null };
    case 'TO_EDIT_MODE':
      return { ...state, isEdit: true };
    case 'TO_READ_MODE':
      return { ...state, isEdit: false };
    default:
      return state;
  }
};

export default statusContextReducer;
