import { styled } from 'styled-components/native';
import { getColorByTheme } from 'utils';
import type { FooterMode } from './Footer.type';

const FooterContainer = styled.View<{ mode: FooterMode }>`
  position: absolute;
  height: 80px;
  width: 100%;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  bottom: 0;
  flex: 1;
  background: ${({ theme, mode }) =>
    mode === 'NoteListView'
      ? getColorByTheme(theme).background
      : getColorByTheme(theme).backgroundNote};
`;

const FooterMessage = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: row;
`;

export { FooterContainer, FooterMessage };
