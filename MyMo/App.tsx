import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { usePrepare, useTheme } from './src/hooks';
import { Stack } from './src/components';
import { RealmContext } from './src/models';

export default function App() {
  const { appIsReady, onLayoutRootView } = usePrepare();
  const { RealmProvider } = RealmContext;

  const { theme } = useTheme();

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RealmProvider>
          <View onLayout={onLayoutRootView} />
          <Stack />
        </RealmProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
