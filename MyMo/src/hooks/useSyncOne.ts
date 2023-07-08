import { onlineManager } from '@tanstack/react-query';
import useStatus from './useStatus';
import { useObject } from '@realm/react';
import { Memo } from 'models';
import { MemoController } from 'api';
import { useQuery } from '@tanstack/react-query';

const useSyncOne = () => {
  const { state } = useStatus();
  const memo_id = state.memo?._id ?? '';
  const memoByLocal = useObject(Memo, memo_id);
  const {
    isLoading,
    isError,
    data: memoByServer
  } = useQuery({
    queryKey: ['memo', memo_id],
    queryFn: () => MemoController.getOne(memo_id)
  });
};

export default useSyncOne;
