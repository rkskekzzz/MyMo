import type { DefaultTheme } from 'styled-components/native';

const getColorByTheme = (theme: DefaultTheme) => {
  return theme[theme.mode];
};

export default getColorByTheme;
