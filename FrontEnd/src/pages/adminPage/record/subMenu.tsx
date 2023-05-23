import React, { useState } from 'react';
import styled from 'styled-components';
import ViewAll from './viewAll';
import ViewGame from './viewGame';
import ViewUser from './viewUser';

const SubMenu = () => {
  const [menu, setMenu] = useState<number>(0);
  const handleMenuClick = (value: number) => {
    setMenu(value);
  };
  return (
    <Container>
      <Nav>
        <p onClick={() => handleMenuClick(0)}>전체 보기</p>
        <p onClick={() => handleMenuClick(1)}>게임별 보기</p>
        <p onClick={() => handleMenuClick(2)}>유저별 보기</p>
      </Nav>
      <Content>
        {menu === 0 ? (
          <ViewAll />
        ) : menu === 1 ? (
          <ViewGame />
        ) : menu === 2 ? (
          <ViewUser />
        ) : (
          ''
        )}
      </Content>
    </Container>
  );
};

export default SubMenu;

const Container = styled.div``;

const Nav = styled.div`
  display: flex;
  p {
    padding: 0  2rem  2rem 2rem;
    cursor: pointer;
    font-size: 1.8rem;
    font
  }
`;
const Content = styled.div`
  display: flex;
  width: auto;
  height: auto;
`;
