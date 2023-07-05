import { Text, View } from 'react-native';
import { usePrepare, useTheme } from './src/hooks';
import Entypo from '@expo/vector-icons/Entypo';
import { ThemeProvider } from 'styled-components';

export default function App() {
  const { appIsReady, onLayoutRootView } = usePrepare();
  const theme = useTheme();

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onLayout={onLayoutRootView}
      >
        <Text>Hello World!</Text>
        <Entypo name="rocket" size={30} />
      </View>
    </ThemeProvider>
  );
}
