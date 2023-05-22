import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

type ChildProps = {
  onValue: (value: boolean) => void;
};
type GameInfo = {
  name: string;
  iconUrl: string;
  category: string;
  description: string;
  menual: string;
  status: string;
};

type ChildPropsData = {
  receivedData: GameInfo;
};

const GameInfoEditing: React.FC<ChildProps & ChildPropsData> = ({
  onValue,
  receivedData,
}) => {
  //input 처리
  const [inputs, setInputs] = useState<GameInfo>({
    name: receivedData.name,
    iconUrl: receivedData.iconUrl,
    category: receivedData.category,
    description: receivedData.description,
    menual: receivedData.menual,
    status: receivedData.status,
  });

  const { name, iconUrl, category, description, menual, status } = inputs;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  console.log(process.env.REACT_APP_API_URL);

  //취소
  const handleCancelClick = () => {
    onValue(false);
  };
  //저장
  const handleSaveClick = () => {
    onValue(false);
  };

  return (
    <Container>
      <ContentDiv>
        <p>게임명</p>
        <input type="text" name="name" value={name} onChange={handleChange} />
      </ContentDiv>
      <ContentDiv>
        <p>게임 아이콘</p>{' '}
        <div>
          <input
            type="text"
            name="iconUrl"
            value={iconUrl}
            onChange={handleChange}
            style={{ width: '48rem' }}
          />
          <Button
            style={{
              width: '12rem',
              fontSize: '1.6rem',
              margin: '0.4rem 0 0 0',
            }}
          >
            이미지 등록
          </Button>
        </div>
      </ContentDiv>
      <ContentDiv>
        <p>카테고리</p>{' '}
        <input
          type="text"
          name="category"
          value={category}
          onChange={handleChange}
        />
      </ContentDiv>
      <ContentDiv>
        <p>게임 설명</p>{' '}
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
        />
      </ContentDiv>
      <ContentDiv>
        <p>게임 조작</p>{' '}
        <textarea name="menual" value={menual} onChange={handleChange} />
      </ContentDiv>
      <ContentDiv>
        <p>게임 상태</p>{' '}
        <input
          type="text"
          name="status"
          value={status}
          onChange={handleChange}
        />
      </ContentDiv>
      <ButtonDiv>
        <Button onClick={() => handleCancelClick()}>취소</Button>
        <Button onClick={() => handleSaveClick()}>저장</Button>
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
  border-bottom: 1px solid #e0e0e0;
`;

const ButtonDiv = styled.div`
  margin: 8rem 40rem 2rem 0;
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
