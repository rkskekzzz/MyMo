import React from 'react';
import StyledTxt from './Txt.styled';

type Props = {
  children: React.ReactNode;
} & React.ComponentProps<typeof StyledTxt>;

const Txt = ({ children, fontSize, fontWeight, color, textAlign, ...props }: Props) => {
  return (
    <StyledTxt
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      textAlign={textAlign}
      {...props}
    >
      {children}
    </StyledTxt>
  );
};

export default Txt;
