import React from 'react';
import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useObject, useRealm } from '@realm/react';
import { useStatus, useInput, useDebounce } from 'hooks';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@components/navigation';
import { Memo } from 'models';

const StyledView = styled.View`
  flex: 1;
`;
const StyledText = styled.Text``;
const StyledTouchableOpacity = styled.TouchableOpacity``;
const StyledTextInput = styled.TextInput``;

const MemoView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const realm = useRealm();
  const { state, dispatch } = useStatus();
  const taskObject = useObject(Memo, state.task?._id ?? '');
  const { value, onChangeText } = useInput(state.task?.content);

  const onPressIn = () => {
    if (!state.isEdit) dispatch({ type: 'TO_EDIT_MODE' });
  };

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
      <StyledTextInput
        multiline
        onChangeText={onChangeText}
        editable={state.isEdit}
        onPressIn={onPressIn}
      >
        {value}
      </StyledTextInput>
      <Footer mode="MemoView" />
    </StyledView>
  );
};

export default MemoView;
