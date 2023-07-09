import { useRef } from 'react';
import { useInput, useStatus, useDebounce } from 'hooks';
import { NoteViewTextInput, NoteViewTextInputTitle } from './NoteView.styled';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import type { TextInput } from 'react-native';

type Props = {
  update: (title: string, content: string) => void;
};

const NoteDefaultView = ({ update }: Props) => {
  const { t } = useTranslation();
  const contentRef = useRef<TextInput>(null);
  const theme = useTheme();
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
        placeholder={t('note-view.note.title.placeholder')}
        onChangeText={onChangeTitle}
        editable={state.isEdit}
        onPressIn={onPressIn}
        blurOnSubmit={false}
        onSubmitEditing={onSubmitEditingInTitle}
      >
        {title}
      </NoteViewTextInputTitle>
      <NoteViewTextInput
        multiline
        placeholder={t('note-view.note.content.placeholder')}
        placeholderTextColor={theme[theme.mode].text.disabled + '80'}
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
