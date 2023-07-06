import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { usePrepare, useTheme } from 'hooks';
import { Stack } from '@components/navigation';
import { schemas } from 'models';
import { RealmProvider } from '@realm/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusContext, statusContextInitialValue, statusContextReducer } from 'context';
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
