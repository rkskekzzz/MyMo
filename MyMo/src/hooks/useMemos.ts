import { useRealm } from '@realm/react';
import { Memo } from 'models';
import useStatus from './useStatus';

const useMemos = () => {
  const { state, dispatch } = useStatus();
  const realm = useRealm();

  const create = () => {
    realm.write(() => {
      const newMemo = realm.create<Memo>('Memo', Memo.generate());
      dispatch({ type: 'SET_MEMO', newMemo });
    });
  };

  const remove = () => {
    realm.write(() => {
      realm.delete(state.memo);
    });
  };

  return { create, remove };
};

export default useMemos;
