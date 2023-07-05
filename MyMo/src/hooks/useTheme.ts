import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { light, dark } from '../theme';
import type { DefaultTheme } from 'styled-components';

const useTheme = () => {
  const mode = useColorScheme() === 'dark' ? 'dark' : 'light';
  const [theme, setTheme] = useState<DefaultTheme>({ light, dark, mode });

  useEffect(() => {
    setTheme((prev) => ({ ...prev, mode }));
  }, [mode]);

  return { theme };
};

export default useTheme;
