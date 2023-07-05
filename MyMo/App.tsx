import { Text, View } from 'react-native';
import { usePrepare } from './src/hooks';
import Entypo from '@expo/vector-icons/Entypo';

export default function App() {
  const { appIsReady, onLayoutRootView } = usePrepare();

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}
    >
      <Text>Hello World!</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
}
