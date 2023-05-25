import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GameAddOrEdit from './gameAddOrEdit';
import { GameInfo, GameData } from './interface';

const GameInfoEdit = () => {
  const URL = `${process.env.REACT_APP_API_URL}/api/games`;

  const [data, setData] = useState<GameInfo[]>([]);
  const [sendingData, setSendingData] = useState<GameData>();

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  //추가 컴포넌트 전환
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const handleAddClick = () => {
    if (sendingData !== null) {
      setSendingData(undefined);
    }
    setIsAdding(true);
  };
  // 수정 컴포넌트 전환
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = (id: string) => {
    setIsEditing(true);

    //수정시 전달할 데이터
    const gameInfo = data.find((item) => item._id === id);
    if (gameInfo) {
      setSendingData({
        id: gameInfo._id,
        name: gameInfo.gameTitle,
        imageUrl: gameInfo.gameImageUrl.toString(),
        category: gameInfo.gameCategory,
        description: gameInfo.gameDescription,
        menual: gameInfo.gameManual,
        status: gameInfo.gameServiceStatus,
      });
    }
  };
  // handleValue에서 받아오는 값이 newData 일 경우 setData에 추가된 값 넣어 data 업데이트,
  //받아오는 값이 updateData일 경우 받아온 게임아이디랑 등록되어있는 게임 아이디랑 일치시 일치된 아이디에 대한 정보를 수정된 데이터로 업데이트

  const handleValue = (
    newData: GameInfo | null,
    updateData: GameInfo | null,
    value: boolean
  ) => {
    console.log(updateData);
    if (newData) {
      setData([...data, newData]);
    }
    if (updateData)
      if (updateData) {
        setData((prevData) =>
          prevData.map((item) => {
            if (item._id === updateData._id) {
              return {
                ...item,
                gameCategory: updateData.gameCategory,
                gameDescription: updateData.gameDescription,
                gameIconUrl: updateData.gameIconUrl,
                gameManual: updateData.gameManual,
                gameTitle: updateData.gameTitle,
                gameServiceStatus: updateData.gameServiceStatus,
              };
            }
            return item;
          })
        );
      }
    setIsEditing(value);
    setIsAdding(value);
  };
  //삭제
  const handleDeleteClick = async (id: string, gameName: string) => {
    const deleteConfirm = window.confirm(
      `[${gameName}] 게임을 삭제하시겠습니까?`
    );
    if (deleteConfirm) {
      try {
        await axios.delete(`${URL}/${id}`);
        setData(data.filter((item) => item._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };
  // 추가 수정 GameAddOrEdit 컴포넌트에서 한 번에 진행,
  //receivedData={null}이면 GameAddOrEdit에 input 값이 빈값으로 시작
  //receivedData={sendingData} 보내는 데이터가 있으면 받은 값으로 input값이 들어감
  return (
    <>
      {!isEditing && !isAdding ? (
        <>
          <AddButtonDiv>
            <AddButton onClick={handleAddClick}>게임 정보 등록</AddButton>
          </AddButtonDiv>
          {data.map((item: GameInfo) => (
            <Container key={item._id}>
              <ImageContent>
                <GameImage
                  // src={item.gameImageUrl}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7aRfWK5rqENOh5_8z0VK5FEKlGLcEfi-CLg&usqp=CAU"
                  alt="게임 아이콘"
                />
              </ImageContent>
              <div>
                <Title>[{item.gameTitle}]</Title>
                <Content>
                  <FlexContnet>
                    <SubTitle>카테고리:</SubTitle>
                    <ContentText>{item.gameCategory.join(', ')}</ContentText>
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
              <ButtonDiv>
                <Button onClick={() => handleEditClick(item._id)}>수정</Button>
                <Button
                  onClick={() => handleDeleteClick(item._id, item.gameTitle)}
                >
                  삭제
                </Button>
              </ButtonDiv>
            </Container>
          ))}
        </>
      ) : sendingData ? (
        <GameAddOrEdit onValue={handleValue} receivedData={sendingData} />
      ) : isAdding ? (
        <GameAddOrEdit onValue={handleValue} receivedData={null} />
      ) : (
        ''
      )}
    </>
  );
};

export default GameInfoEdit;

const Container = styled.div`
  display: flex;
  padding: 2rem 2rem 2rem 6rem;
  width: auto;
  height: auto;
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
  flex: 1;
  position: relative;
  padding: 0.5rem;
  height: auto;
`;
const SubTitle = styled.div`
  font-size: 1.4rem;
  color: #616161;
  font-weight: 500;
`;

const ContentText = styled.p`
  padding-left: 2rem;
  color: #242424;
  font-size: 1.6rem;
  font-weight: 500;
  height: auto;
`;

const ButtonDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 4rem 2rem 0;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;
const Button = styled.button`
  margin-right: 2rem;
  width: 9rem;
  height: 4.4rem;
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
const AddButtonDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 3rem 6.8rem 0 0;
`;

const AddButton = styled.button`
  border-radius: 10px;
  background: #000080;
  color: #ffffff;
  font-size: 1.8rem;
  padding: 1.6rem 2rem;
  &:hover {
    background: rgba(0, 0, 128, 0.8);
  }
  &:active {
    background: rgba(0, 0, 128, 0.6);
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
