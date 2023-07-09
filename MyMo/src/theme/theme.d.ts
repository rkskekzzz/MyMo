import 'styled-components/native';
import { ColorStyle } from './theme.type';
import { ColorSchemeName } from 'react-native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    mode: Exclude<ColorSchemeName, null | undefined>;
    light: ColorStyle;
    dark: ColorStyle;
  }
}
