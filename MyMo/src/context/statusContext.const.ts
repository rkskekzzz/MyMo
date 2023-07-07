import type { State } from './statusContext.type';

const statusContextInitialValue: State = {
  memo: null,
  isEdit: false,
  count: 0,
  isSyncing: false
};

export default statusContextInitialValue;
