import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { useInput, useStatus, useDebounce } from 'hooks';
import { TextInput } from 'react-native';

const StyledView = styled.ScrollView`
  flex: 1;
`;
// const StyledText = styled.Text``;
const StyledTextInput = styled(TextInput)``;

type Props = {
  update: (title: string, content: string) => void;
};

const NoteDefaultView = ({ update }: Props) => {
  const contentRef = useRef<TextInput>(null);
  const { state, dispatch } = useStatus();
  const { value: title, onChangeText: onChangeTitle } = useInput(state.note?.title);
  const { value: content, onChangeText: onChangeContent } = useInput(state.note?.content);

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
    </StyledView>
  );
};

export default NoteDefaultView;
