import { styled } from 'styled-components/native';
import { getColorByTheme } from 'utils';
import { Ionicons } from '@expo/vector-icons';
import { TextColor } from 'theme';

const Button = styled.TouchableOpacity`
  color: ${({ theme }) => getColorByTheme(theme).background};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(Ionicons)<{ color?: TextColor }>`
  color: ${({ theme, color }) =>
    color ? getColorByTheme(theme).text[color] : getColorByTheme(theme).icon};
`;

export { Button, Icon };
