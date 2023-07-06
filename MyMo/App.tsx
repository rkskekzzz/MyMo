import { View, SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { usePrepare, useTheme } from './src/hooks';
import { Stack } from './src/components';
import { schemas } from './src/models';
import { RealmProvider } from '@realm/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusContext, statusContextInitialValue, statusContextReducer } from './src/context';
import { useReducer } from 'react';

export default function App() {
  const [state, dispatch] = useReducer(statusContextReducer, statusContextInitialValue);
  const { appIsReady, onLayoutRootView } = usePrepare();

  const { theme } = useTheme();

  if (!appIsReady) {
    return null;
  }

  return (
    <StatusContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RealmProvider schema={schemas}>
              <View onLayout={onLayoutRootView} />
              <Stack />
            </RealmProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </StatusContext.Provider>
  );
}
