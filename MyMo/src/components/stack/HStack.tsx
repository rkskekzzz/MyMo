import styled from 'styled-components/native';

const HStackContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

type Props = {
  children: React.ReactNode;
};

const HStack = ({ children }: Props) => {
  return <HStackContainer>{children}</HStackContainer>;
};

export default HStack;
