import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import theme from '../theme';

const useTheme = () => {
  const mode = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(theme[mode === 'dark' ? 'dark' : 'light']);

  useEffect(() => {
    if (mode) setCurrentTheme(theme[mode]);
  }, [mode]);

  return { currentTheme };
};

export default useTheme;
