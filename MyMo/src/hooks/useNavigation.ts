import { useNavigation as useRNNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@components/navigation';

const useNavigation = () => {
  const navigation = useRNNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goBack = () => navigation.goBack();

  const toMemoView = () => {
    if (navigation.getState().routes[0].name === 'MemoView') goBack();
    navigation.navigate('MemoView');
  };

  return { goBack, toMemoView };
};

export default useNavigation;
