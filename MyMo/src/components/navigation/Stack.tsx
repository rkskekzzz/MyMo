import { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoteView } from 'components/noteView';
import { NoteListView } from 'components/noteListView';
import { useStatus } from 'hooks';
import { useTranslation } from 'react-i18next';
import { HeaderButton } from './Stack.styled';
import { useTheme } from 'styled-components/native';
import type { RootStackParamList } from './Stack.type';

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  const { state, dispatch } = useStatus();
  const theme = useTheme();
  const { t } = useTranslation();

  const NoteViewHeaderOption = useMemo(() => {
    return {
      title: '',
      headerRight: () =>
        state.isEdit ? (
          <HeaderButton
            title={t('note-view.header.done')}
            onPress={() => {
              dispatch({ type: 'TO_READ_MODE' });
            }}
            color={theme[theme.mode].icon}
          />
        ) : null
    };
  }, [state.isEdit]);

  return (
    <NativeStack.Navigator
      initialRouteName="NoteListView"
      screenOptions={{
        headerTintColor: theme[theme.mode].icon,
        headerStyle: {
          backgroundColor: theme[theme.mode].background
        }
      }}
    >
      <NativeStack.Screen
        name="NoteListView"
        component={NoteListView}
        options={{ title: t('note-list-view.header.title') }}
      />
      <NativeStack.Screen name="NoteView" component={NoteView} options={NoteViewHeaderOption} />
    </NativeStack.Navigator>
  );
};

export default Stack;
