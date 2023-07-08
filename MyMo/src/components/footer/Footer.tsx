import React from 'react';
import { styled } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { onlineManager } from '@tanstack/query-core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HStack, ZStack } from '@components/stack';
import { useStatus, useNote } from 'hooks';
import { getColorByTheme } from 'utils';
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
  const { create, remove, removeAlert } = useNote();
  const { state } = useStatus();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const SyncStatus = () => {
    if (onlineManager.isOnline()) {
      if (state.isSyncing) {
        return (
          <StyledView>
            <Ionicons name="cloud-upload-sharp" size={20} color="black" />
            <StyledText2>동기화 중</StyledText2>
          </StyledView>
        );
      } else {
        return (
          <StyledView>
            <Ionicons name="cloud-done-sharp" size={20} color="black" />
            <StyledText2>동기화 완료</StyledText2>
          </StyledView>
        );
      }
    } else {
      <StyledView>
        <Ionicons name="cloud-offline-sharp" size={20} color="black" />
        <StyledText2>{t('footer-offline')}</StyledText2>
      </StyledView>;
    }
  };

  return (
    <StyledFooter style={{ paddingBottom: insets.bottom }}>
      <ZStack>
        {mode === 'NoteListView' && (
          <StyledText>{state.count + t('footer-count-of-notes')}</StyledText>
        )}
        {mode === 'NoteView' && <SyncStatus />}
        <HStack>
          <StyledButton onPress={create}>
            <Ionicons name="create-outline" size={24} color="black" />
          </StyledButton>
          {mode === 'NoteView' && (
            <StyledButton onPress={() => removeAlert(remove)}>
              <Ionicons name="ios-trash-bin-outline" size={24} color="black" />
            </StyledButton>
          )}
        </HStack>
      </ZStack>
    </StyledFooter>
  );
};

export default Footer;
