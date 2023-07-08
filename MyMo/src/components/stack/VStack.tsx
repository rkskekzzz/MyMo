import styled from 'styled-components/native';

const VStackContainer = styled.View`
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

type Props = {
  children: React.ReactNode;
};

const VStack = ({ children }: Props) => {
  return <VStackContainer>{children}</VStackContainer>;
};

export default VStack;
