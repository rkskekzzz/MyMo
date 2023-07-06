import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { usePrepare, useTheme } from './src/hooks';
import { Stack } from './src/components';
import { schemas } from './src/models';
import { RealmProvider } from '@realm/react';
// import { RealmContext } from './src/models';

export default function App() {
  const { appIsReady, onLayoutRootView } = usePrepare();

  const { theme } = useTheme();

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RealmProvider schema={schemas}>
          <View onLayout={onLayoutRootView} />
          <Stack />
        </RealmProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
