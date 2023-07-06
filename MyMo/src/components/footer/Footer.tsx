import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { FooterMode } from './Footer.type';
import { HStack, ZStack } from '../stack';
import { getColorByTheme } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useObject, useRealm } from '@realm/react';
import { Task } from '../../models/Memo';
import useStatus from '../../hooks/useState';

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
  const [isCreate, setIsCreate] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const realm = useRealm();
  const insets = useSafeAreaInsets();
  const {
    state: { task },
  } = useStatus();

  const onPress = () => {
    realm.write(() => {
      const newTask = Task.generate('newDescription');
      realm.create('Task', newTask);
      // task setting
    });
  };

  const onDelete = () => {
    if (task) {
      realm.write(() => {
        realm.delete(task);
        // task clear
      });
    }
  };

  return (
    <StyledFooter style={{ paddingBottom: insets.bottom }}>
      <ZStack>
        {mode === 'inMemos' && <StyledText>4개의 메모</StyledText>}
        {mode === 'inMemo' && <StyledText>업데이트 중...</StyledText>}
        <HStack>
          <StyledButton onPress={onPress}>
            <Ionicons name="create-outline" size={24} color="black" />
          </StyledButton>
          {mode === 'inMemo' && (
            <StyledButton>
              <Ionicons name="ios-trash-bin-outline" size={24} color="black" />
            </StyledButton>
          )}
        </HStack>
      </ZStack>
    </StyledFooter>
  );
};

export default Footer;
