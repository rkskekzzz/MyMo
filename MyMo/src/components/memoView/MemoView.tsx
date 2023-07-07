import React, { useRef } from 'react';
import { styled } from 'styled-components/native';
import { Footer } from '../footer';
import { useObject, useRealm } from '@realm/react';
import { useStatus, useInput, useDebounce } from 'hooks';
import { Memo } from 'models';
import { TextInput } from 'react-native';

const StyledView = styled.View`
  flex: 1;
`;
const StyledText = styled.Text``;
const StyledTextInput = styled(TextInput)``;

const MemoView = () => {
  const { state, dispatch } = useStatus();
  const realm = useRealm();
  const contentRef = useRef<TextInput>(null);
  const taskObject = useObject(Memo, state.task?._id ?? '');
  const { value: title, onChangeText: onChangeTitle } = useInput(state.task?.title);
  const { value: content, onChangeText: onChangeContent } = useInput(state.task?.content);

  const onPressIn = () => {
    if (!state.isEdit) dispatch({ type: 'TO_EDIT_MODE' });
  };

  const onSubmitEditingInTitle = () => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  };

  useDebounce(() => {
    if (taskObject) {
      realm.write(() => {
        taskObject.updatedAt = new Date();
        taskObject.title = title;
        taskObject.content = content;
      });
    }
  }, [title, content]);

  return (
    <StyledView style={{ flex: 1 }}>
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
