import { useRef } from 'react';
import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useStatus, useInput, useDebounce, useMemos } from 'hooks';
import { TextInput } from 'react-native';

const StyledView = styled.View`
  flex: 1;
`;
// const StyledText = styled.Text``;
const StyledTextInput = styled(TextInput)``;

const MemoView = () => {
  const contentRef = useRef<TextInput>(null);
  const { update } = useMemos();
  const { state, dispatch } = useStatus();
  const { value: title, onChangeText: onChangeTitle } = useInput(state.memo?.title);
  const { value: content, onChangeText: onChangeContent } = useInput(state.memo?.content);

  const onPressIn = () => {
    if (!state.isEdit) dispatch({ type: 'TO_EDIT_MODE' });
  };

  const onSubmitEditingInTitle = () => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  };

  useDebounce(() => {
    update(title, content);
  }, [title, content]);

  return (
    <StyledView>
      <StyledTextInput
        autoFocus
        placeholder="title"
        onChangeText={onChangeTitle}
        editable={state.isEdit}
        onPressIn={onPressIn}
        blurOnSubmit={false}
        onSubmitEditing={onSubmitEditingInTitle}
      >
        {title}
      </StyledTextInput>
      <TextInput
        placeholder="content"
        multiline
        ref={contentRef}
        onChangeText={onChangeContent}
        editable={state.isEdit}
        onPressIn={onPressIn}
      >
        {content}
      </TextInput>
      <Footer mode="MemoView" />
    </StyledView>
  );
};

export default MemoView;
