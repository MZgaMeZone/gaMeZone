import React from 'react';
import styled from 'styled-components';

interface ButtonSmallProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean | undefined;
}

export const ButtonDashedSmall: React.FC<ButtonSmallProps> = ({
  text,
  onClick,
  type,
  disabled,
}) => {
  console.log(type);
  return (
    <ButtonContainer
      type={type || 'button'}
      disabled={disabled ? disabled : false}
      onClick={onClick}
    >
      <Button border="dashed" disabled={disabled ? disabled : false}>
        {text}
      </Button>
    </ButtonContainer>
  );
};

export const ButtonNormalSmall: React.FC<ButtonSmallProps> = ({
  text,
  onClick,
  type,
  disabled,
}) => {
  return (
    <ButtonContainer
      type={type ? type : 'button'}
      disabled={disabled ? disabled : false}
      onClick={onClick}
    >
      <Button border="normal" disabled={disabled ? disabled : false}>
        {text}
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  width: 13rem;
  height: 4.6rem;
  cursor: pointer;
  position: relative;
  padding: 0 1rem;
  background-color: var(--background--gray);
  ::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(254, 254, 254) rgb(10, 10, 10) rgb(10, 10, 10)
      rgb(254, 254, 254);
    box-shadow: rgb(223 223 223) 1px 1px 0px 1px inset,
      rgb(132 133 132) -1px -1px 0px 1px inset;
  }
  ::after {
    content: '';
    position: absolute;
    display: block;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
  }
`;

const Button = styled.div<{ border: string; disabled: boolean }>`
  width: 100%;
  height: 65%;
  border: ${({ border, disabled }) =>
    border === 'normal'
      ? 'none'
      : disabled
      ? '0.2rem dashed #727272'
      : '0.2rem dashed #000000'};
  background-color: var(--background--gray);
  font-size: 1.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
