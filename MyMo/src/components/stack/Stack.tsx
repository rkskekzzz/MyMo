import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { RealmContext } from '../../models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery, useRealm } from '@realm/react';
import { Task } from '../../models/Memo';

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
  // const { useRealm } = RealmContext;
  const realm = useRealm();
  const tasks = useQuery(Task);
  const onSubmit = () => {
    realm.write(() => {
      realm.create('Task', Task.generate('newDescription'));
    });
    console.log(tasks.length);
  };
  return (
    <View style={{ flex: 1 }}>
      <TextInput>Test One</TextInput>
      <TouchableOpacity onPress={onSubmit}>
        <Text>submit</Text>
      </TouchableOpacity>
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
