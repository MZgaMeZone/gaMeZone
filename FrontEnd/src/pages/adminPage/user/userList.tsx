import React, { useState } from 'react';
import styled from 'styled-components';

const UserList = () => {
  const dermyData = [
    { nickname: '^O^/', email: '1234567@gmail.com' },
    { nickname: '^O^/', email: '1234567@gmail.com' },
    { nickname: '^O^/', email: '1234567@gmail.com' },
    { nickname: '^O^/', email: '1234567@gmail.com' },
    { nickname: '^O^/', email: '1234567@gmail.com' },
  ];

  return (
    <Container>
      <Title>회원 리스트</Title>
      <NavBar>
        <p>프로필</p>
        <p>닉네임</p>
        <p>이메일</p>
      </NavBar>
      {dermyData.map((item, index) => (
        <Content key={index}>
          <ImageContent>
            <GameImage
              // src={item.gameImageUrl}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7aRfWK5rqENOh5_8z0VK5FEKlGLcEfi-CLg&usqp=CAU"
              alt="게임 아이콘"
            />
          </ImageContent>
          <p>{item.nickname}</p>
          <p>{item.email}</p>
          <div>
            <Button>수정</Button>
            <Button>탈퇴</Button>
          </div>
        </Content>
      ))}
    </Container>
  );
};

export default UserList;

const Container = styled.div`
  width: 100%;
  height: auto;
`;
const Title = styled.p`
  margin: 3rem 0 0 5rem;
  font-size: 2.4rem;
  margin-bottom: 4rem;
  font-weight: 600;
`;
const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 3rem 0 2rem 0;
  padding: 1.6rem 50rem 1.6rem 8rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: #242424;
  background: #d9d9d9;

  border-top: 3px solid #808080;
  border-bottom: 3px solid #808080;
`;
const Content = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
`;
const ImageContent = styled.div`
  margin: 1rem;
  width: 10rem;
  height: 10rem;
  border: 3px solid #242424;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
`;
const GameImage = styled.img`
  border-radius: 7px;
  width: 8rem;
`;

const Button = styled.button`
  margin-right: 2rem;
  width: 8rem;
  height: 4rem;
  background: #000080;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.6rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 128, 0.8);
  }
  &:active {
    background: rgba(0, 0, 128, 0.6);
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
