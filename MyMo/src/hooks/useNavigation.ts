import { useNavigation as useRNNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@components/navigation';

const useNavigation = () => {
  const navigation = useRNNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goBack = () => navigation.goBack();

  const toNoteView = () => {
    if (navigation.getState()?.index && navigation.getState().index === 1) goBack();
    navigation.navigate('NoteView');
  };

  return { goBack, toNoteView };
};

export default useNavigation;
