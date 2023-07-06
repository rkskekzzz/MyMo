import type { State, Action } from './statusContext.type';

const statusContextReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_TASK':
      return { ...state, task: action.newTask };
    // case 'UPDATE_TASK':
    //   return { ...state, task: { ...state.task, ...action.newContent } }
    case 'CLEAR_TASK':
      return { ...state, task: null };
    case 'SET_IS_EDIT':
      return { ...state, isEdit: action.newIsEdit };
    default:
      return state;
  }
};

export default statusContextReducer;
