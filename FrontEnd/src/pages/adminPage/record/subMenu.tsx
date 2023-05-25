import React, { useState } from 'react';
import styled from 'styled-components';
import ViewScore from './viewScore';

const SubMenu = () => {
  const URL = `${process.env.REACT_APP_API_URL}/api/scores`;
  const [menu, setMenu] = useState<number>(0);
  const handleMenuClick = (value: number) => {
    setMenu(value);
  };
  return (
    <Container>
      <Nav>
        {menu === 0 ? (
          <SelectedMenu>
            <p>
              게임별 보기<span></span>
            </p>
          </SelectedMenu>
        ) : (
          <p onClick={() => handleMenuClick(0)}>게임별 보기</p>
        )}
        <div>
          {menu === 1 ? (
            <SelectedMenu>
              <p>
                유저별 보기 <span></span>
              </p>
            </SelectedMenu>
          ) : (
            <p onClick={() => handleMenuClick(1)}>유저별 보기</p>
          )}
        </div>
      </Nav>
      <Content>
        {menu === 0 ? (
          <ViewScore URL={URL} menu={0} />
        ) : menu === 1 ? (
          <ViewScore URL={URL} menu={1} />
        ) : (
          ''
        )}
      </Content>
    </Container>
  );
};

export default SubMenu;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Nav = styled.div`
  display: flex;
  p {
    padding: 0 2rem 2rem 2rem;
    cursor: pointer;
    font-size: 2rem;
    font-weight: 500;
    color: #242424;
    &:active {
      font-weight: 600;
    }
  }
`;

const Content = styled.div`
  display: flex;
  width: auto;
  height: auto;
`;

const SelectedMenu = styled.div`
  p {
    font-weight: 600;
    span {
      display: flex;
      width: 6rem;
      border: 1px solid #000080;
      border-radius: 1px;
    }
  }
`;
