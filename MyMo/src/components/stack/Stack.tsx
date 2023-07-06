import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Test = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Test One</Text>
    </View>
  );
};
const Test2 = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Test One</Text>
    </View>
  );
};

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="메모" component={Test} />
      <NativeStack.Screen name="아이템" component={Test2} />
    </NativeStack.Navigator>
  );
};

export default Stack;
