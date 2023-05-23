import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GameInfo, GameData } from './interface';

type ChildProps = {
  onValue: (
    newData: GameInfo | null,
    updateData: GameInfo | null,
    value: boolean
  ) => void;
};
type ChildPropsData = {
  receivedData: GameData | null;
};

const GameAddOrEdit: React.FC<ChildProps & ChildPropsData> = ({
  onValue,
  receivedData,
}) => {
  //input 처리
  //null로 받아올 경우 (isAdding=== true일 경우)  input은 빈값으로 처리,
  //receivedData값이 있을 경우 (isEditing=== true) input에 해당 아이템의 값을 넣어 준다.
  const URL = process.env.REACT_APP_API_URL;
  const [inputs, setInputs] = useState<GameData>({
    id: '',
    name: receivedData?.name ?? '',
    imageUrl: receivedData?.imageUrl ?? '',
    category: receivedData?.category ?? '',
    description: receivedData?.description ?? '',
    menual: receivedData?.menual ?? '',
    status: receivedData?.status ?? '',
  });

  const { name, imageUrl, category, description, menual, status } = inputs;
  console.log(name);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //취소
  const handleCancelClick = () => {
    onValue(null, null, false);
  };

  //새로 등록시
  const handleAddClick = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/games`, {
        gameTitle: name,
        gameCategory: category,
        gameImageUrl: imageUrl,
        gameDescription: description,
        gameManual: menual,
        gameServiceStatus: status,
      })
      .then((res) => {
        onValue(res.data, null, false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //수정내용 저장
  const handleSaveClick = () => {
    if (receivedData) {
      axios
        .patch(`http://localhost:8080/api/games/${receivedData.id}`, {
          gameTitle: name,
          gameCategory: category,
          gameImageUrl: imageUrl,
          gameDescription: description,
          gameManual: menual,
          gameServiceStatus: status,
        })
        .then((res) => {
          onValue(null, res.data, false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <ContentDiv>
        <p>게임명</p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          autoFocus
        />
      </ContentDiv>
      <ContentDiv>
        <p>게임 이미지</p>
        <div>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
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
        <p>카테고리</p>
        <input
          type="text"
          name="category"
          value={category}
          onChange={handleChange}
        />
      </ContentDiv>
      <ContentDiv>
        <p>게임 설명</p>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
        />
      </ContentDiv>
      <ContentDiv>
        <p>게임 조작</p>
        <textarea name="menual" value={menual} onChange={handleChange} />
      </ContentDiv>
      <ContentDiv>
        <p>게임 상태</p>
        <input
          type="text"
          name="status"
          value={status}
          onChange={handleChange}
        />
      </ContentDiv>
      <ButtonDiv>
        <Button onClick={() => handleCancelClick()}>취소</Button>
        {receivedData ? (
          <Button onClick={() => handleSaveClick()}>저장</Button>
        ) : (
          <Button onClick={() => handleAddClick()}>등록</Button>
        )}
      </ButtonDiv>
    </Container>
  );
};

export default GameAddOrEdit;

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
    font-size: 2rem;
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
