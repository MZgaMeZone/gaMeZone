import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SelectGame from './selectGame';
import { Score } from './scoreInterface';
import ScoreModal from './scoreModal';
import SearchUser from './searchUser';

type Props = {
  URL: string;
  menu: number;
};

const ViewScore: React.FC<Props> = ({ URL, menu }) => {
  //****게임별 보기  => 드롭다운 menu === 0 SelectGame
  //****유저별 보기  => 검색창  menu === 1 SearchUser

  //**드롭다운을 통해 게임이름을 선택하면 받아온 게임아이디를 scoreAPI get요청하여 게임 기록정보를 받아온다.
  //게임 컴포넌트에서 받아온 게임아이디를 gameId에 담아준다.
  const [gameId, setGameId] = useState<string>('');
  const handleDropDownValue = (id: string) => {
    setGameId(id);
  };

  const [scoreData, setScoreData] = useState<Score[]>([]);
  useEffect(() => {
    axios
      .get(`${URL}/games/gameId/${gameId}`)
      .then((res) => setScoreData(res.data))
      .catch((err) => console.log(err));
  }, [gameId]);

  //게임정보 상세 보기(모달창)

  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [modalData, setModalData] = useState<Score>();

  const openModal = (data: Score, id: string) => {
    setModalData(data);
    setIsOpen((prevState) => ({ ...prevState, [id]: true }));
  };

  const closeModal = () => {
    setIsOpen((prevState) => {
      const updatedState = { ...prevState };
      Object.keys(updatedState).forEach((key) => {
        updatedState[key] = false;
      });
      return updatedState;
    });
  };

  //삭제
  const handleDeleteClick = (id: string, user: string) => {
    const deleteConfirm = window.confirm(
      `[${user}] 님의 기록을 삭제하시겠습니까?`
    );
    if (deleteConfirm) {
      axios
        .delete(`${URL}/${id}`)
        .then((res) =>
          setScoreData(scoreData.filter((item) => item._id !== id))
        )
        .catch((err) => console.log(err));
    }
  };
  return (
    <Container>
      <DropdownDiv>
        {menu === 0 ? (
          <SelectGame onValue={handleDropDownValue} />
        ) : menu === 1 ? (
          <SearchUser URL={URL} />
        ) : (
          ''
        )}
      </DropdownDiv>
      {scoreData.length === 0 && gameId ? (
        <ResetContent>등록된 기록이 없습니다.</ResetContent>
      ) : gameId === '' ? (
        <ResetContent>조회할 게임을 선택해주세요.</ResetContent>
      ) : (
        <Main>
          <Title>
            <p>user</p>
            <p style={{ paddingLeft: '18rem' }}>score</p>
          </Title>
          {scoreData.map((item: Score) => (
            <Content key={item._id}>
              <NameText>{item.userNickname}</NameText>
              <ScoreText>{item.averageScore}</ScoreText>
              <div>
                {isOpen[item._id] ? (
                  <ScoreModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    id={item._id}
                    data={modalData}
                  ></ScoreModal>
                ) : (
                  ''
                )}
                <Button onClick={() => openModal(item, item._id)}>상세</Button>
                <Button
                  onClick={() => handleDeleteClick(item._id, item.userNickname)}
                >
                  삭제
                </Button>
              </div>
            </Content>
          ))}
        </Main>
      )}
      <FooterDiv />
    </Container>
  );
};

export default ViewScore;

const Container = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  width: 100%;
  height: auto;
`;

const DropdownDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  width: 100%;
`;
const Main = styled.div`
  position: relative;
  width: 116rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;
const Title = styled.div`
  display: flex;
  background: #d9d9d9;
  padding: 1rem;
  border-top: 3px solid #808080;
  border-bottom: 3px solid #808080;
  p {
    color: #242424;
    font-size: 2.4rem;
    padding-left: 10rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  padding: 3rem;
  border-bottom: 1px solid #808080;
  background: #ebeded;
  p {
    position: absolute;
    color: #242424;
    font-size: 2.2rem;
  }
  div {
    display: flex;
    position: absolute;
    right: 10rem;
    align-items: center;
  }
`;
const NameText = styled.p`
  left: 10rem;
`;
const ScoreText = styled.p`
  left: 35rem;
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
const FooterDiv = styled.div`
  padding: 2rem;
  border-bottom: 2px solid #e0e0e0;
`;

const ResetContent = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
`;
