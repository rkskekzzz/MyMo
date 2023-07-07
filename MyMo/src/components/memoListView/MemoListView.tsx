import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useQuery } from '@realm/react';
import { Memo } from '../../models/Memo';
import { useStatus, useMemoList } from 'hooks';
import type { StackScreenProps } from '../navigation';
import { useEffect, useMemo } from 'react';

const StyledView = styled.View`
  flex: 1;
`;
const StyledText = styled.Text``;

const MemoListView = ({ navigation }: StackScreenProps) => {
  const { dispatch } = useStatus();
  const { getAll } = useMemoList();
  const memos = useQuery(Memo);

  useEffect(() => {
    dispatch({ type: 'SET_COUNT', newCount: memos.length });
  }, [memos]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getAll();
    });
  }, []);

  return (
    <StyledView style={{ flex: 1 }}>
      {memos.map((memo, index) => {
        return (
          <StyledText
            key={index}
            onPress={() => {
              dispatch({ type: 'SET_MEMO', newMemo: memo });
              navigation.navigate('MemoView');
            }}
          >
            {memo.title}
          </StyledText>
        );
      })}
      <Footer mode="MemoListView" />
    </StyledView>
  );
};

export default MemoListView;
