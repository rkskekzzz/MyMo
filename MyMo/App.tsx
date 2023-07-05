import { Text, View } from 'react-native';
import { usePrepare, useTheme } from './src/hooks';
import Entypo from '@expo/vector-icons/Entypo';
import { ThemeProvider } from 'styled-components';
import { getColorByTheme } from './src/utils';
import styled from 'styled-components/native';

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
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onLayout={onLayoutRootView}
      >
        <StyledText>Hello World!</StyledText>
        <Entypo name="rocket" size={30} />
      </View>
    </ThemeProvider>
  );
}
