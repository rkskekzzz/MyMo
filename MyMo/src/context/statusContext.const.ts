import type { State } from './statusContext.type';

const statusContextInitialValue: State = {
  note: null,
  isEdit: false,
  count: 0,
  isSyncing: false
};

export default statusContextInitialValue;
