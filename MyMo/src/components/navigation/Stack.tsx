import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MemoListView } from '../memoListView';
import { MemoView } from '../memoView';
import { styled } from 'styled-components/native';
import { useStatus } from 'hooks';
import { useTranslation } from 'react-i18next';
import type { RootStackParamList } from './Stack.type';

const HeaderButton = styled.Button``;

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  const { state, dispatch } = useStatus();
  const { t } = useTranslation();

  const MemoViewHeaderOption = useMemo(() => {
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
        ) : null,
    };
  }, [state.isEdit]);

  return (
    <NativeStack.Navigator initialRouteName="MemoListView">
      <NativeStack.Screen
        name="MemoListView"
        component={MemoListView}
        options={{ title: t('header-memo-list-title') }}
      />
      <NativeStack.Screen name="MemoView" component={MemoView} options={MemoViewHeaderOption} />
    </NativeStack.Navigator>
  );
};

export default Stack;
