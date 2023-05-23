import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GameInfo } from '../info/interface';
import GameDropDown from './gameDropdown';
import { Score } from './scoreInterface';

type Props = {
  URL: string;
};

const ViewGame: React.FC<Props> = ({ URL }) => {
  //**드롭다운을 통해 게임이름을 선택하면 받아온 게임아이디를 scoreAPI get요청하여 게임 기록정보를 받아온다.

  //게임 드롭다운에 쓰일 게임아이디, 게임 타이틀을 담아줄 객체
  const [gameData, setGameData] = useState<GameInfo>({
    _id: '',
    gameTitle: '',
    gameIconUrl: '',
    gameImageUrl: '',
    gameCategory: '',
    gameDescription: '',
    gameManual: '',
    gameServiceStatus: '',
  });
  //게임 정보 가져오는 API를 통해서 게임 데이터를 게임드롭다운 컴포넌트로 전달 한다.
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/games`)
      .then((res) => setGameData(res.data))
      .catch((err) => console.log(err));
  }, []);

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
  console.log(scoreData);
  return (
    <Container>
      <div>
        <GameDropDown options={gameData} onValue={handleDropDownValue} />
      </div>
      {scoreData.map((item: Score) => (
        <div key={item.gameId}></div>
      ))}
    </Container>
  );
};

export default ViewGame;

const Container = styled.div`
  display: flex;
  position: relative;
  padding: 2rem 2rem 2rem 6rem;
  width: auto;
  height: auto;
  border-bottom: 2px solid #e0e0e0;
`;
