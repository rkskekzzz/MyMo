import React from 'react';
import styled from 'styled-components/native';

const ZStackContainer = styled.View`
  flex: 1;
  position: relative;
`;

type Props = {
  children: React.ReactNode;
};

const ZStack = ({ children }: Props) => {
  return <ZStackContainer>{children}</ZStackContainer>;
};

export default ZStack;
