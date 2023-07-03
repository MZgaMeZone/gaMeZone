import React from 'react';
import styled from 'styled-components';

interface ButtonSmallProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  type?: 'submit' | 'reset' | 'button';
}

const ButtonSmall: React.FC<ButtonSmallProps> = ({ text, onClick, type }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <Button type={type ? type : 'button'}>{text}</Button>
    </ButtonContainer>
  );
};

export default ButtonSmall;

const ButtonContainer = styled.div`
  padding: 0.6rem;
  background: #d9d9d9;
  border: 0.1rem solid #000000;
  box-shadow: inset 0.4rem 0.4rem 0.4rem 0rem #ffffff,
    0.2rem 0.2rem 0.2rem 0rem #000000;
  cursor: pointer;
`;

const Button = styled.button`
  box-sizing: border-box;
  width: 13rem;
  height: 3.4rem;
  border: 0.2rem dashed #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  padding-top: 0.2rem;
`;
