import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useQuery } from '@realm/react';
import { Task } from '../../models/Memo';
import { useStatus } from 'hooks';
import type { StackScreenProps } from '../navigation';

const StyledView = styled.View`
  flex: 1;
`;
const StyledText = styled.Text``;

const Memos = ({ navigation }: StackScreenProps) => {
  const { dispatch } = useStatus();
  const tasks = useQuery(Task);

  return (
    <StyledView style={{ flex: 1 }}>
      {tasks.map((task, index) => {
        return (
          <StyledText
            key={index}
            onPress={() => {
              dispatch({ type: 'SET_TASK', newTask: task });
              navigation.navigate('memo');
            }}
          >
            {task.content}
          </StyledText>
        );
      })}
      <Footer mode="inMemos" />
    </StyledView>
  );
};

export default Memos;
