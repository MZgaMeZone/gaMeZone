import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import exitImg from '../../style/icons/x-solid.svg';

interface ContainerHeaderProps {
  favicon?: string;
  title: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ContainerHeader: React.FC<ContainerHeaderProps> = ({
  favicon,
  title,
  onClick,
}) => {
  return (
    <Header>
      <HeaderTitle>
        {favicon && <img src={favicon} alt="gameFavicon" />}
        <p>{title}</p>
      </HeaderTitle>
      <ExitButton onClick={onClick}>
        <img src={exitImg} alt="exitImg" />
      </ExitButton>
    </Header>
  );
};

export default ContainerHeader;

const Header = styled.div`
  width: 99%;
  height: 4.8rem;
  margin: 0.5rem auto auto auto;

  background: #000080;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  display: flex;
  > img {
    width: 4.4rem;
    height: 4.4rem;
    margin-left: 1.5rem;
  }
  > p {
    padding-left: 1.5rem;
    color: white;
    display: flex;
    align-items: center;
    font-size: 2.5rem;
  }
`;

const ExitButton = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  margin-right: 0.7rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;
  > img {
    width: 65%;
    height: 65%;
    display: flex;
    margin: 0.6rem auto;
  }
`;
