import { createContext } from 'react';
import type { State, Action } from './statusContext.type';
import statusContextInitialValue from './statusContext.const';

const StatusContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: statusContextInitialValue,
  dispatch: () => {},
});

export default StatusContext;
