import { useEffect } from 'react';

const DEBOUNCE_TIME = 500;

const useDebounce = (callback: () => void = () => {}, dependancies: any[]) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(timeout);
    };
  }, dependancies);
};

export default useDebounce;
