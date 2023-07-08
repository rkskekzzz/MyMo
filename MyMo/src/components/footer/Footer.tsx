import { ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { onlineManager } from '@tanstack/query-core';
import { VStack, ZStack } from '@components/stack';
import { useStatus, useNote } from 'hooks';
import { useTranslation } from 'react-i18next';
import { FooterContainer, FooterMessage } from './Footer.styled';
import { Button, Icon } from 'components/Button';
import { Txt } from 'components/Txt';
import type { FooterMode } from './Footer.type';

type Props = {
  mode: FooterMode;
};

const Footer = ({ mode }: Props) => {
  const { create, remove, removeAlert } = useNote();
  const { state } = useStatus();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const SyncingIndicator = () => (
    <FooterMessage>
      <ActivityIndicator size="small" color="primary" />
      <Txt fontSize="sm">{t('note-view.footer.syncing')}</Txt>
    </FooterMessage>
  );

  const SyncStatus = () => {
    if (onlineManager.isOnline()) {
      if (state.isSyncing) {
        return <SyncingIndicator />;
      } else {
        return (
          <FooterMessage>
            <Icon name="cloud-done-outline" size={16} color="success" />
            <Txt color="success" fontSize="sm">
              {t('note-view.footer.synced')}
            </Txt>
          </FooterMessage>
        );
      }
    } else {
      <FooterMessage>
        <Icon name="cloud-offline-sharp" size={16} color="error" />
        <Txt fontSize="sm">{t('note-view.footer.offline')}</Txt>
      </FooterMessage>;
    }
  };

  return (
    <FooterContainer mode={mode} style={{ paddingBottom: insets.bottom }}>
      <ZStack>
        {mode === 'NoteListView' &&
          (state.isSyncing ? (
            <SyncingIndicator />
          ) : (
            <FooterMessage>
              <Txt fontSize="xs">{state.count + t('note-list-view.footer.count-of-notes')}</Txt>
            </FooterMessage>
          ))}
        {mode === 'NoteView' && <SyncStatus />}
        <VStack>
          <Button onPress={create}>
            <Icon name="create-outline" size={24} />
          </Button>
          {mode === 'NoteView' && (
            <Button onPress={() => removeAlert(remove)}>
              <Icon name="ios-trash-bin-outline" size={24} />
            </Button>
          )}
        </VStack>
      </ZStack>
    </FooterContainer>
  );
};

export default Footer;
