import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Memos } from '../memos';
import { Memo } from '../memo';
import type { RootStackParamList } from './Stack.type';

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  return (
    <NativeStack.Navigator initialRouteName="memos">
      <NativeStack.Screen name="memos" component={Memos} />
      <NativeStack.Screen name="memo" component={Memo} />
    </NativeStack.Navigator>
  );
};

export default Stack;
