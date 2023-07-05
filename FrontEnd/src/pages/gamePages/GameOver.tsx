import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import gameoverBgImg from '../../style/icons/gameover-bg-img.svg';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import { RankingDataType } from '../../types/gameType';

const GameOver = () => {
  const [mainModal, setMainModal] = useState<boolean>(false);
  const [rankingData, setRankingData] = useState<RankingDataType[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  //recorder에서 유저의 이번 회차 점수 데이터도 같이 받아옴.
  const { gameId, userNickName, userAverageScore, userHighScore } =
    location.state || {};

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/scores/${gameId}/avr/nonHonors?num=10`
      )
      .then((res) => {
        setRankingData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        minHeight: '880px',
        minWidth: '900px',
      }}
    >
      <GameOverContainer
        style={{
          backgroundImage: `url(${gameoverBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <GameOverHeader>
          <p>***&nbsp;GAME OVER&nbsp;***</p>
        </GameOverHeader>
        <GameOverBody>
          <GameOverBodyTop>
            <div className="game-over-body-title">UPDATED RANKING</div>
            <UserScore>
              <span>
                <span>USERID: </span>
                <span>{userNickName}, &nbsp;</span>
              </span>
              <span>
                <span>AVG:</span>
                <span>{userAverageScore}, &nbsp;</span>
                <span>HIGH:</span>
                <span>{userHighScore}</span>
              </span>
            </UserScore>
          </GameOverBodyTop>
          <GameOverNav>
            <NavTitle long={false} short>
              RANKING
            </NavTitle>
            <NavTitle long short={false}>
              ID
            </NavTitle>
            <NavTitle long={false} short={false}>
              AVG SCORE
            </NavTitle>
            <NavTitle long={false} short={false}>
              HIGH SCORE
            </NavTitle>
          </GameOverNav>
          <RankingContent>
            {rankingData &&
              rankingData.map((data: RankingDataType, idx: number) => (
                <RankingItem key={data.createdAt}>
                  <RankingIdx>{`${idx + 1}.`}</RankingIdx>
                  <IdLi>{data.userNickname}</IdLi>
                  <ScoreLi>{data.averageScore}</ScoreLi>
                  <ScoreLi>{data.highScore}</ScoreLi>
                </RankingItem>
              ))}
          </RankingContent>
        </GameOverBody>
        <GameOverFooter>
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            MAIN
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            RETRY
          </button>
        </GameOverFooter>
      </GameOverContainer>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default GameOver;

const GameOverContainer = styled.div`
  width: 113rem;
  height: 78rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'neodgm', cursive;
  background-color: white;

  display: flex;
  flex-direction: column;
  border: 0.1rem solid white;
  box-shadow: 3px 3px 4px #1c1c1c;
`;

const GameOverHeader = styled.div`
  width: 50rem;
  height: 4.8rem;
  background-color: white;
  font-size: 4.3rem;
  text-align: center;
  padding: 0.5rem 4rem;
  margin: 5rem auto 3rem auto;
`;

const GameOverBody = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const GameOverBodyTop = styled.div`
  width: 75rem;
  margin: 0 auto;
  font-size: 2.5rem;
  display: flex;
  justify-content: space-between;
`;

const UserScore = styled.div`
  color: yellow;
`;

const GameOverNav = styled.div`
  width: 97rem;
  height: 5rem;
  border: 0.4rem solid white;
  padding-right: 7rem;
  padding-left: 7rem;
  margin: 1rem auto 2rem auto;
  display: flex;
  align-items: center;
`;

const NavTitle = styled.span<{ long: boolean; short: boolean }>`
  font-size: 3rem;
  flex: ${({ long, short }) => (long ? 2 : short ? 1.5 : 1.7)};
  text-align: ${({ long }) => (long ? 'start' : 'center')};
  padding-left: ${({ long }) => long && '2rem'};
`;

const RankingContent = styled.div`
  width: 80rem;
  margin: auto;
`;

const RankingItem = styled.ul`
  display: flex;
  font-size: 3.2rem;
  li {
    margin-bottom: 1rem;
  }
`;

const RankingIdx = styled.li`
  flex: 1;
  padding-left: 6rem;
`;

const IdLi = styled.li`
  flex: 2;
`;

const ScoreLi = styled.li`
  flex: 1.5;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameOverFooter = styled.div`
  display: flex;
  margin: 2.5rem auto;
  > :not(:last-child) {
    margin-right: 3.4rem;
  }
  button {
    width: 20rem;
    height: 6.3rem;
    background: transparent;
    border: 0.5rem solid white;
    color: white;
    font-size: 4.3rem;
  }
`;
