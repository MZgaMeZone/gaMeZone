import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import '../../style/gameOver.css';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

import gameoverBgImg from '../../style/icons/gameover-bg-img.svg';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import { fontFamily } from '@mui/system';

interface rankingDataType {
  gameId: string;
  userNickname: string;
  averageScore: number;
  highScore: number;
  createdAt: string;
  updatedAt: string;
}

const GameOver = () => {
  const [mainModal, setMainModal] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>('');
  const [rankingData, setRankingData] = useState<rankingDataType[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

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
        console.log(res.data);
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
      <div
        className="game-over"
        style={{
          backgroundImage: `url(${gameoverBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="game-over-header">
          <p>***&nbsp;GAME OVER&nbsp;***</p>
        </div>
        <div className="game-over-body">
          <div className="game-over-body-top">
            <div className="game-over-body-title">UPDATED RANKING</div>
            <div className="user-score">
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
            </div>
          </div>
          <div className="game-over-nav">
            <span className="ranking">RANKING</span>
            <span className="id">ID</span>
            <span className="avgscore">AVG SCORE</span>
            <span className="highscore">HIGH SCORE</span>
          </div>
          <div className="ranking-content">
            {rankingData &&
              rankingData.map((data: rankingDataType, idx: number) => (
                <ul className="ranking-item" key={data.createdAt}>
                  <li className="ranking-idx">{`${idx + 1}.`}</li>
                  <li className="id-li">{data.userNickname}</li>
                  <li className="score-li avg">{data.averageScore}</li>
                  <li className="score-li high">{data.highScore}</li>
                </ul>
              ))}
          </div>
        </div>
        <div className="game-over-footer">
          <button
            className="btn to-main"
            onClick={() => {
              navigate('/');
            }}
          >
            MAIN
          </button>
          <button
            className="btn to-retry"
            onClick={() => {
              navigate(-1);
            }}
          >
            RETRY
          </button>
        </div>
      </div>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default GameOver;
