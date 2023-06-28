import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import exitImg from '../../style/icons/x-solid.svg';

function ContainerHeader({
  favicon,
  title,
}: {
  favicon: string;
  title: string;
}) {
  const navigate = useNavigate();

  return (
    <Header>
      <HeaderTitle>
        <img src={favicon} alt="gameFavicon" />
        <p>{title}</p>
      </HeaderTitle>
      <ExitButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={exitImg} alt="exitImg" />
      </ExitButton>
    </Header>
  );
}

export default ContainerHeader;

const Header = styled.div`
  width: 97.5%;
  height: 4.8rem;
  margin: 0.7rem auto auto auto;

  background: #000080;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  display: flex;
  > img {
    width: 5.5rem;
    margin-left: 1.5rem;
  }
  > p {
    padding-left: 1.5rem;
    color: white;
    display: flex;
    align-items: center;
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
