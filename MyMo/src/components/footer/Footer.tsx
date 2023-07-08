import React from 'react';
import { styled } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { onlineManager } from '@tanstack/query-core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HStack, ZStack } from '@components/stack';
import { useStatus, useNavigation, useNote } from 'hooks';
import { getColorByTheme } from 'utils';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { FooterMode } from './Footer.type';

const StyledFooter = styled.View`
  position: absolute;
  width: 100%;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  bottom: 0;
  background: ${({ theme }) => getColorByTheme(theme).secondary};
  flex: 1;
`;
const StyledText = styled.Text`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledText2 = styled.Text``;
const StyledButton = styled.TouchableOpacity``;
const StyledView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: row;
`;

type Props = {
  mode: FooterMode;
};

const Footer = ({ mode }: Props) => {
  const { goBack, toNoteView } = useNavigation();
  const { create, remove } = useNote();
  const { state, dispatch } = useStatus();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const onPressCreate = () => {
    toNoteView();
    create();
  };

  const onPressDelete = () => {
    Alert.alert(t('alert-delete-title'), t('alert-delete-description'), [
      {
        text: t('alert-delete-cancel'),
        style: 'destructive'
      },
      {
        text: t('alert-delete-ok'),
        onPress: () => {
          goBack();
          remove();
          dispatch({ type: 'CLEAR_NOTE' });
        }
      }
    ]);
  };

  return (
    <StyledFooter style={{ paddingBottom: insets.bottom }}>
      <ZStack>
        {mode === 'NoteListView' && (
          <StyledText>{state.count + t('footer-count-of-notes')}</StyledText>
        )}
        {mode === 'NoteView' && (
          <StyledView>
            {onlineManager.isOnline() ? (
              <Ionicons name="cloud-done-sharp" size={20} color="black" />
            ) : (
              <Ionicons name="cloud-offline-sharp" size={20} color="black" />
            )}
            <StyledText2>{t('footer-updating')}</StyledText2>
          </StyledView>
        )}
        <HStack>
          <StyledButton onPress={onPressCreate}>
            <Ionicons name="create-outline" size={24} color="black" />
          </StyledButton>
          {mode === 'NoteView' && (
            <StyledButton onPress={onPressDelete}>
              <Ionicons name="ios-trash-bin-outline" size={24} color="black" />
            </StyledButton>
          )}
        </HStack>
      </ZStack>
    </StyledFooter>
  );
};

export default Footer;
