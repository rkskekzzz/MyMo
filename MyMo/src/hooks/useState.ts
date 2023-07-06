import { StatusContext } from '../context';
import { useContext } from 'react';

const useStatus = () => {
  const { state, dispatch } = useContext(StatusContext);

  return { state, dispatch };
};

export default useStatus;
