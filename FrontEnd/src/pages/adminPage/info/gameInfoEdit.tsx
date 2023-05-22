import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GameInfoEditing from './gameInfoEditing';
interface Game {
  _id: string;
  gameTitle: string;
  gameIconUrl: String;
  gameImageUrl: String;
  gameCategory: string;
  gameDescription: string;
  gameManual: string;
  gameServiceStatus: string;
}

const GameInfoEdit = () => {
  const [data, setData] = useState<Game[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/games')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(process.env.REACT_APP_API_URL);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleEditClick = (id: string) => {
    setIsEditing(true);
    const gameInfo = data.find((item) => item._id === id);
    if (gameInfo) {
    }
  };
  return (
    <>
      {!isEditing ? (
        <>
          {data.map((item: Game) => (
            <Container key={item._id}>
              <ImageContent>
                <GameImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7aRfWK5rqENOh5_8z0VK5FEKlGLcEfi-CLg&usqp=CAU"
                  alt="게임 아이콘"
                />
              </ImageContent>
              <div>
                <Title>[{item.gameTitle}]</Title>
                <Content>
                  <FlexContnet>
                    <SubTitle>카테고리:</SubTitle>
                    <ContentText>{item.gameCategory}</ContentText>
                  </FlexContnet>
                  <FlexContnet>
                    <SubTitle>게임 설명:</SubTitle>
                    <ContentText>{item.gameDescription}</ContentText>
                  </FlexContnet>
                  <FlexContnet>
                    <SubTitle>게임 조작:</SubTitle>
                    <ContentText>{item.gameManual}</ContentText>
                  </FlexContnet>
                  <FlexContnet>
                    <SubTitle>게임 상태:</SubTitle>
                    <ContentText>{item.gameServiceStatus}</ContentText>
                  </FlexContnet>
                </Content>
              </div>
              <Button onClick={() => handleEditClick(item._id)}>
                수정하기
              </Button>
            </Container>
          ))}
        </>
      ) : (
        <GameInfoEditing />
      )}
    </>
  );
};

export default GameInfoEdit;

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
