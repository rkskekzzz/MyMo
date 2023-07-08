import { createContext } from 'react';
import statusContextInitialValue from './statusContext.const';
import type { State, Action } from './statusContext.type';

const StatusContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: statusContextInitialValue,
  dispatch: () => {}
});

export default StatusContext;
