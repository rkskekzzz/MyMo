import { useState } from 'react';

const useInput = (initialValue: string | undefined) => {
  const [value, setValue] = useState(initialValue ?? '');

  const onChangeText = (newValue: string) => {
    setValue(newValue);
  };

  return {
    value,
    onChangeText,
  };
};

export default useInput;
