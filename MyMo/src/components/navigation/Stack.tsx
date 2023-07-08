import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoteView } from 'components/noteView';
import { NoteListView } from 'components/noteListView';
import { styled } from 'styled-components/native';
import { useStatus } from 'hooks';
import { useTranslation } from 'react-i18next';
import type { RootStackParamList } from './Stack.type';

const HeaderButton = styled.Button``;

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  const { state, dispatch } = useStatus();
  const { t } = useTranslation();

  const NoteViewHeaderOption = useMemo(() => {
    return {
      title: '',
      headerRight: () =>
        state.isEdit ? (
          <HeaderButton
            title={t('header-done')}
            onPress={() => {
              dispatch({ type: 'TO_READ_MODE' });
            }}
          />
        ) : null
    };
  }, [state.isEdit]);

  return (
    <NativeStack.Navigator initialRouteName="NoteListView">
      <NativeStack.Screen
        name="NoteListView"
        component={NoteListView}
        options={{ title: t('header-note-list-title') }}
      />
      <NativeStack.Screen name="NoteView" component={NoteView} options={NoteViewHeaderOption} />
    </NativeStack.Navigator>
  );
};

export default Stack;
