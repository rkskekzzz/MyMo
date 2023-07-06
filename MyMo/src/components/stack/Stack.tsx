import React from 'react';
import { View, Text } from 'react-native';
import { RealmContext } from '../../models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  memos: undefined;
  item: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'memos'>;

const Test = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Text onPress={() => navigation.navigate('item')}>Test One</Text>
    </View>
  );
};
const Test2 = () => {
  const { useRealm } = RealmContext;
  const realm = useRealm();
  console.log(realm);
  return (
    <View style={{ flex: 1 }}>
      <Text>Test One</Text>
    </View>
  );
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  return (
    <NativeStack.Navigator initialRouteName="memos">
      <NativeStack.Screen name="memos" component={Test} />
      <NativeStack.Screen name="item" component={Test2} />
    </NativeStack.Navigator>
  );
};

export default Stack;
