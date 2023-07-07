import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HStack, ZStack } from '@components/stack';
import { useRealm } from '@realm/react';
import { Memo } from 'models';
import { useStatus, useNavigation, useMemos } from 'hooks';
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
const StyledButton = styled.TouchableOpacity``;

type Props = {
  mode: FooterMode;
};

const Footer = ({ mode }: Props) => {
  const { goBack, toMemoView } = useNavigation();
  const { create, remove } = useMemos();
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useStatus();
  const { t } = useTranslation();

  const onPressCreate = () => {
    toMemoView();
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
          dispatch({ type: 'CLEAR_MEMO' });
        }
      }
    ]);
  };

  return (
    <StyledFooter style={{ paddingBottom: insets.bottom }}>
      <ZStack>
        {mode === 'MemoListView' && (
          <StyledText>{state.count + t('footer-count-of-memos')}</StyledText>
        )}
        {mode === 'MemoView' && <StyledText>{t('footer-updating')}</StyledText>}
        <HStack>
          <StyledButton onPress={onPressCreate}>
            <Ionicons name="create-outline" size={24} color="black" />
          </StyledButton>
          {mode === 'MemoView' && (
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
