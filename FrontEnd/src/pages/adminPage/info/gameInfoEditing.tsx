import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const GameInfoEditing = () => {
  const handleSaveClick = () => {};

  return (
    <Container>
      <ContentDiv>
        <p>게임명</p>
        <input type="text" />
      </ContentDiv>
      <ContentDiv>
        <p>게임 아이콘</p> <input type="text" />
        {/* <Button>이미지 등록</Button> */}
      </ContentDiv>
      <ContentDiv>
        <p>카테고리</p> <input type="text" />
      </ContentDiv>
      <ContentDiv>
        <p>게임 설명</p> <textarea />
      </ContentDiv>
      <ContentDiv>
        <p>게임 조작</p> <textarea />
      </ContentDiv>
      <ContentDiv>
        <p>게임 상태</p> <input type="text" />
      </ContentDiv>
      <ButtonDiv>
        <Button>취소</Button>
        <Button>저장</Button>
      </ButtonDiv>
    </Container>
  );
};

export default GameInfoEditing;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;

  p {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #242424;
  }
  input {
    width: 60rem;
    height: 3.4rem;
    margin: 1rem;
    padding-left: 2rem;
    background-color: rgb(233, 233, 233);
    border: 0;
    border-radius: 15px;
    font-weight: 500;
    font-size: 1.8rem;
    vertical-align: top;

    &:focus {
      border: 2px solid #008080;
    }
  }
  textarea {
    box-sizing: border-box;
    width: 61rem;
    height: 10rem;
    padding: 2rem;
    background-color: rgb(233, 233, 233);
    border: none;
    border-radius: 15px;
    font-weight: 500;
    font-size: 1.8rem;
    vertical-align: top;

    &:focus {
      outline-color: #008080;
    }
  }
`;
const ContentDiv = styled.div`
  width: 80rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 0;
`;

const ButtonDiv = styled.div`
  margin: 8rem 20rem 2rem 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  width: 9rem;
  height: 4.4rem;
  margin-left: 2rem;
  background: #000080;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.8rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 128, 0.8);
  }
  &:active {
    background: rgba(0, 0, 128, 0.6);
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
