import React from 'react';
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

  const MemoViewHeaderOption = {
    headerRight: () => (
      <HeaderButton
        title={t('header-done')}
        onPress={() => {
          dispatch({ type: 'TO_READ_MODE' });
        }}
      />
    ),
  };

  return (
    <NativeStack.Navigator initialRouteName="MemoListView">
      <NativeStack.Screen name="MemoListView" component={MemoListView} />
      <NativeStack.Screen
        name="MemoView"
        component={MemoView}
        options={state.isEdit ? MemoViewHeaderOption : {}}
      />
    </NativeStack.Navigator>
  );
};

export default Stack;
