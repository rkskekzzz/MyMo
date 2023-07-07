import { useEffect } from 'react';
import { useRealm } from '@realm/react';
import { Memo } from 'models';
import { MemoController } from 'api';
import { useQuery as useRealmQuery } from '@realm/react';
import { useMutation } from '@tanstack/react-query';
import useStatus from './useStatus';

const useMemos = () => {
  const { state, dispatch } = useStatus();
  const memos = useRealmQuery(Memo);
  const filteredMemos = memos.filter((memo) => memo.deletedAt === null);
  const realm = useRealm();
  const updateMemoSyncedAt = (data: Memo) => {
    const memo = memos.find((memo) => memo._id === data._id);
    if (memo) {
      realm.write(() => {
        memo.syncedAt = data.syncedAt;
        console.log(memo.syncedAt);
      });
    }
  };
  const createMutation = useMutation({
    mutationFn: MemoController.create,
    onSuccess: updateMemoSyncedAt
  });
  const updateMutation = useMutation({
    mutationFn: MemoController.update,
    onSuccess: updateMemoSyncedAt
  });
  const removeMutation = useMutation({
    mutationFn: MemoController.remove,
    onSuccess: updateMemoSyncedAt
  });

  const sync = () => {};

  const create = () => {
    const memo = Memo.generate();

    if (memo) {
      realm.write(() => {
        const newMemo = realm.create<Memo>('Memo', memo);
        dispatch({ type: 'SET_MEMO', newMemo });
      });
      createMutation.mutate({ ...memo });
    }
  };

  const update = (title: string, content: string) => {
    const memo = state.memo;
    const now = new Date();

    if (memo) {
      realm.write(() => {
        memo.updatedAt = now;
        memo.title = title;
        memo.content = content;
      });
      updateMutation.mutate({ _id: memo._id, title, content, updatedAt: now });
    }
  };

  const remove = () => {
    const memo = state.memo;
    const now = new Date();

    if (memo) {
      realm.write(() => {
        memo.deletedAt = now;
      });
      removeMutation.mutate({ _id: memo._id, deletedAt: now });
    }
  };

  useEffect(() => {
    dispatch({ type: 'SET_COUNT', newCount: memos.length });
  }, [memos]);

  return { memos, filteredMemos, create, update, remove, sync };
};

export default useMemos;
