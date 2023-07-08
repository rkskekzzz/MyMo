import { styled } from 'styled-components/native';
import { Text } from 'react-native';
import { getColorByTheme } from 'utils';
import type { TextColor } from 'theme';

type Props = {
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter';
  color?: TextColor;
  textAlign?: 'left' | 'center' | 'right';
};

const StyledTxt = styled(Text)<Props>`
  color: ${({ theme, color }) => getColorByTheme(theme).text[color || 'primary']};
  font-size: ${({ fontSize }) => {
    switch (fontSize) {
      case 'xs':
        return '12px';
      case 'sm':
        return '14px';
      case 'md':
        return '16px';
      case 'lg':
        return '18px';
      case 'xl':
        return '20px';
      case '2xl':
        return '24px';
      case '3xl':
        return '30px';
      default:
        return '16px';
    }
  }};
  font-weight: ${({ fontWeight }) => {
    switch (fontWeight) {
      case 'lighter':
        return '300';
      case 'normal':
        return '400';
      case 'bold':
        return '600';
      case 'bolder':
        return '700';
      default:
        return 'normal';
    }
  }};
  text-align: ${({ textAlign }) => textAlign || 'left'};
`;

export default StyledTxt;
