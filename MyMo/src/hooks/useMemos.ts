import { useRealm } from '@realm/react';
import { Memo } from 'models';
import { MemoController } from 'api';
import useStatus from './useStatus';

const useMemos = () => {
  const { state, dispatch } = useStatus();
  const realm = useRealm();

  const create = () => {
    // 로컬 생성
    realm.write(() => {
      const newMemo = realm.create<Memo>('Memo', Memo.generate());
      MemoController.create(newMemo).then(() => {
        // update
      });
      dispatch({ type: 'SET_MEMO', newMemo });
    });
    // 백엔드 생성
  };

  const updateIsUploaded = (id: string) => {};

  const update = (title: string, content: string) => {
    realm.write(() => {
      if (state.memo) {
        state.memo.updatedAt = new Date();
        state.memo.title = title;
        state.memo.content = content;
      }
    });
  };

  const remove = () => {
    realm.write(() => {
      realm.delete(state.memo);
    });
  };

  return { create, update, remove };
};

export default useMemos;
