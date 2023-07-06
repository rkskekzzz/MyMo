import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HStack, ZStack } from '@components/stack';
import { useRealm } from '@realm/react';
import { Task } from 'models';
import { useStatus } from 'hooks';
import { getColorByTheme } from 'utils';
import { Alert } from 'react-native';
import type { FooterMode } from './Footer.type';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@components/navigation';

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
  const { state, dispatch } = useStatus();

  const onPress = () => {
    realm.write(() => {
      const newTask = realm.create<Task>('Task', Task.generate('newDescription'));
      dispatch({ type: 'SET_TASK', newTask });
      navigation.navigate('memo');
    });
  };

  const onPressDelete = () => {
    Alert.alert('메모를 삭제하시겠습니까?', '', [
      {
        text: 'Cancel',
        style: 'destructive',
      },
      {
        text: 'OK',
        onPress: () => {
          realm.write(() => {
            realm.delete(state.task);
          });
          dispatch({ type: 'CLEAR_TASK' });
          navigation.goBack();
        },
      },
    ]);
  };

  useEffect(() => {
    console.log(state.task);
  }, [state.task]);

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
