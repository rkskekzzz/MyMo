import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useRealm, useObject } from '@realm/react';
import { Task } from '../../models/Memo';
import type { StackScreenProps } from '../navigation';
import { useInput } from '../../hooks';
import { useEffect } from 'react';

const StyledView = styled.View`
  flex: 1;
`;
const StyledText = styled.Text``;
const StyledTouchableOpacity = styled.TouchableOpacity``;
const StyledTextInput = styled.TextInput``;

const Memo = ({ route }: StackScreenProps) => {
  const task = route.params?.task;
  if (!task) return null;
  const { value, onChangeText } = useInput(task.content);
  const realm = useRealm();

  const onChange = (value: string) => {
    if (task) {
      realm.write(() => {
        task.content = value;
        console.log(task.content);
      });
    }
  };

  useEffect(() => {
    onChange(value);
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
