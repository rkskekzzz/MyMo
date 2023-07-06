import React from 'react';
import styled from 'styled-components/native';

const VStackContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

type Props = {
  children: React.ReactNode;
};

const VStack = ({ children }: Props) => {
  return <VStackContainer>{children}</VStackContainer>;
};

export default VStack;
