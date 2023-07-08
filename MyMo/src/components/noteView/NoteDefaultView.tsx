import { useRef } from 'react';
import { useInput, useStatus, useDebounce } from 'hooks';
import { NoteViewTextInput, NoteViewTextInputTitle } from './NoteView.styled';
import type { TextInput } from 'react-native';

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
    <>
      <NoteViewTextInputTitle
        autoFocus
        placeholder="title"
        onChangeText={onChangeTitle}
        editable={state.isEdit}
        onPressIn={onPressIn}
        blurOnSubmit={false}
        onSubmitEditing={onSubmitEditingInTitle}
      >
        {title}
      </NoteViewTextInputTitle>
      <NoteViewTextInput
        placeholder="content"
        multiline
        ref={contentRef}
        onChangeText={onChangeContent}
        editable={state.isEdit}
        onPressIn={onPressIn}
        scrollEnabled
      >
        {content}
      </NoteViewTextInput>
    </>
  );
};

export default NoteDefaultView;
