import { Text, View } from 'react-native';
import { usePrepare, useTheme } from './src/hooks';
import Entypo from '@expo/vector-icons/Entypo';
import { ThemeProvider } from 'styled-components';
import { getColorByTheme } from './src/utils';
import styled from 'styled-components/native';
import { Stack } from './src/components';
import { NavigationContainer } from '@react-navigation/native';

const StyledText = styled.Text`
  color: ${({ theme }) => getColorByTheme(theme).textPrimary};
`;

export default function App() {
  const { appIsReady, onLayoutRootView } = usePrepare();
  const { theme } = useTheme();

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <View onLayout={onLayoutRootView} />
        <Stack />
      </NavigationContainer>
    </ThemeProvider>
  );
}
