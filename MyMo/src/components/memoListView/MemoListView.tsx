import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useStatus, useMemos } from 'hooks';
import { t } from 'i18next';
import type { StackScreenProps } from '../navigation';

const StyledView = styled.View`
  flex: 1;
`;
const StyledText = styled.Text``;

const MemoListView = ({ navigation }: StackScreenProps) => {
  const { dispatch } = useStatus();
  const { filteredMemos } = useMemos();

  // useFocusEffect(() => {
  //   console.log('hihi');
  // });

  return (
    <StyledView>
      {filteredMemos.map((memo, index) => {
        return (
          <StyledText
            key={index}
            onPress={() => {
              dispatch({ type: 'SET_MEMO', newMemo: memo });
              navigation.navigate('MemoView');
            }}
          >
            {memo.title.length === 0 ? t('memo-list-title-placeholder') : memo.title}
          </StyledText>
        );
      })}
      <Footer mode="MemoListView" />
    </StyledView>
  );
};

export default MemoListView;
