import React from 'react';
import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useObject, useRealm } from '@realm/react';
import { useStatus, useInput, useDebounce } from 'hooks';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@components/navigation';
import { Task } from 'models';

const StyledView = styled.View`
  flex: 1;
`;
const StyledText = styled.Text``;
const StyledTouchableOpacity = styled.TouchableOpacity``;
const StyledTextInput = styled.TextInput``;

const Memo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const realm = useRealm();
  const { state } = useStatus();
  const taskObject = useObject(Task, state.task?._id ?? '');
  const { value, onChangeText } = useInput(state.task?.content);

  useDebounce(() => {
    if (taskObject) {
      realm.write(() => {
        taskObject.updatedAt = new Date();
        taskObject.content = value;
      });
    }
  }, [value]);

  return (
    <StyledView style={{ flex: 1 }}>
      <StyledTextInput multiline onChangeText={onChangeText}>
        {value}
      </StyledTextInput>
      <StyledTouchableOpacity onPress={() => {}}>
        <StyledText>submit</StyledText>
      </StyledTouchableOpacity>
      <Footer mode="inMemo" />
    </StyledView>
  );
};

export default Memo;
