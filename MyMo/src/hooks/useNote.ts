import { useEffect, useState } from 'react';
import { useObject, useRealm } from '@realm/react';
import { Memo } from 'models';
import { MemoController } from 'api';
import { useQuery as useRealmQuery } from '@realm/react';
import { onlineManager, useMutation, useQuery } from '@tanstack/react-query';
import useStatus from './useStatus';

const useNote = () => {
  const { state, dispatch } = useStatus();
  const memo_id = state.memo?._id ?? '';
  const memoByLocal = useObject(Memo, memo_id);
  const realm = useRealm();
  const updateMemoSyncedAt = (data: Memo) => {
    const memo = memoByLocal;
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

  const syncAll = () => {
    // 온라인일때 5초마다
    if (onlineManager.isOnline()) {
      //
    }
  };

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

  // const syncOne = () => {
  //   // 편집중일땐 동기화 중지
  //   if (state.isEdit) return;
  //   const memoByLocal = memosByLocal.find((memo) => memo._id === state.memo?._id);
  //   const memoByLocal = memosByLocal.find((memo) => memo._id === state.memo?._id);
  //   // 온라인 체크
  //   if (onlineManager.isOnline()) {
  //     // 서버에 업로드 안된건 바로 업로드 - syncedAt이 없으면 서버에 없음 -> create 메소드 호출 후 syncedAt 동기화
  //     if (memoByLocal && memoByLocal.syncedAt === null) {
  //       // 여기서 create 실패하는 경우 = 이전 create 호출 당시 응답을 못받은 경우 -> update를 호출해주면 해결
  //       MemoController.create({ ...memoByLocal });
  //       return;
  //     }
  //     // 충돌상태인지 체크
  //     if (memoByServer && memoByLocal) {
  //       if (memoByServer.syncedAt !== memoByLocal.syncedAt) {
  //       } else {
  //         // 정상적으로 동기화 된 상태
  //       }
  //     }
  //   }
  // };

  return { create, update, remove };
};

export default useNote;
