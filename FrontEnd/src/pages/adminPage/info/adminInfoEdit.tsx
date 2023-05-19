import React, { useState } from 'react';
import styled from 'styled-components';

const AdminInfoEdit = () => {
  return (
    <>
      <Container>
        <ImageContent>
          <GameImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7aRfWK5rqENOh5_8z0VK5FEKlGLcEfi-CLg&usqp=CAU"
            alt="게임 아이콘"
          />
        </ImageContent>
        <div>
          <Title>[게임명명명명]</Title>
          <Content>
            <FlexContnet>
              <SubTitle>카테고리:</SubTitle>
              <ContentText>아케이드, 전략</ContentText>
            </FlexContnet>
            <FlexContnet>
              <SubTitle>게임 설명:</SubTitle>
              <ContentText>10초를 정확하게 맞춰라!</ContentText>
            </FlexContnet>
            <FlexContnet>
              <SubTitle>게임 조작:</SubTitle>
              <ContentText>10초를 정확하게 맞추면 됨</ContentText>
            </FlexContnet>
            <FlexContnet>
              <SubTitle>게임 상태:</SubTitle>
              <ContentText>온라인</ContentText>
            </FlexContnet>
          </Content>
        </div>
        <Button>수정하기</Button>
      </Container>
    </>
  );
};

export default AdminInfoEdit;

const Container = styled.div`
  display: flex;
  padding: 2rem;
  width: auto;
  height: 20rem;
  border-bottom: 2px solid #e0e0e0;
  position: relative;
`;
const ImageContent = styled.div`
  margin: 1rem;
  width: 13rem;
  height: 13rem;
  border: 4px solid #242424;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
`;
const GameImage = styled.img`
  border-radius: 5px;
`;
const Title = styled.p`
  margin: 0.4rem 0 0 1rem;
  font-size: 2.4rem;
  color: #242424;
  font-weight: 500;
`;
const Content = styled.div`
  margin: 1.2rem 0 0 3rem;
`;
const FlexContnet = styled.div`
  display: flex;
  flex: 1
  position: relative;
  padding: 0.5rem;

`;
const SubTitle = styled.div`
  font-size: 1.4rem;
  color: #616161;
  font-weight: 500;
`;

const ContentText = styled.p`
  position: absolute;
  left: 36rem;
  color: #242424;
  font-size: 1.6rem;
  font-weight: 500;
`;

const Button = styled.button`
  position: absolute;
  bottom: 3rem;
  right: 4rem;
  width: 12rem;
  height: 5rem;
  background: #000080;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.8rem;
  cursor: pointer;
`;
