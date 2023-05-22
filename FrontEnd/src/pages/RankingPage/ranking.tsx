import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../../style/ranking.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

import exitImg from '../../style/icons/x-solid.svg';
import starIcon from '../../style/icons/star.svg';
import crownIcon from '../../style/icons/crown.svg';
import heartIcon from '../../style/icons/heart.svg';
import dropdownIcon from '../../style/icons/dropdown.svg';
import MainBody from '../mainPage/main-body';
import MainFooter from '../mainPage/main-footer';

interface gameListType {
  _id?: string;
  gameTitle: string;
  gameOption?: string;
}

interface rankingDataType {
  gameId?: string;
  userNickname?: string;
  averageScore?: number;
  highScore?: number;
  score?: number;
}

const Lanking = () => {
  const [showGameList, setShowGameList] = useState(false);
  const [gameList, setGameList] = useState<gameListType[]>([]);
  const [selectedGame, setSelectedGame] = useState<gameListType>({
    gameTitle: '--- 게임을 선택해주세요 ---',
  });
  const [rankingData, setRankingData] = useState<rankingDataType[]>([]);
  const [mainModal, setMainModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/games/`)
      .then((res) => {
        setGameList((current) => [
          {
            gameTitle: '전체 랭킹',
          },
          ...res.data,
        ]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //선택한 게임의 랭킹데이터 저장
  useEffect(() => {
    //전체 랭킹 요청
    if (
      selectedGame.gameTitle === '--- 게임을 선택해주세요 ---' ||
      selectedGame.gameTitle === '전체 랭킹'
    ) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/scores/honors`)
        .then((res) => {
          setRankingData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      //선택된 게임 요청
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/scores/${selectedGame._id}/${selectedGame.gameOption}?num=20`
        )
        .then((res) => {
          setRankingData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedGame]);

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        // minHeight: '880px',
        // minWidth: '900px',
        overflow: 'hidden',
      }}
    >
      <div className="rank-container">
        <div className="rank-container-header">
          <div className="rank-container-header-title">
            <img src={starIcon} alt="gameFavicon" />
            <p>명예의 전당</p>
          </div>
          <div
            className="exit-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={exitImg} alt="exitImg" />
          </div>
        </div>
        <div className="rank-container-body">
          <div className="rank-nav">
            <div
              className="select-game-header"
              onClick={() => {
                setShowGameList(!showGameList);
              }}
            >
              <p>{selectedGame.gameTitle}</p>

              <img
                className="dropdownIcon"
                src={dropdownIcon}
                alt="dropdownIcon"
              />
            </div>

            {showGameList && (
              <ul className="select-game-list">
                {gameList &&
                  gameList.map((data) => (
                    <li
                      key={data._id}
                      onClick={() => {
                        setSelectedGame(data);
                        setShowGameList(!showGameList);
                      }}
                    >
                      {data.gameTitle}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div className="top3-section">
            <div className="section-header">
              <img src={crownIcon} alt="crownIcon" />
              <h2>Top3</h2>
              <div>
                <hr />
              </div>
            </div>
            <div className="top3-section-body">
              <ul>
                {rankingData &&
                  (selectedGame.gameTitle === '전체 랭킹' ||
                  selectedGame.gameTitle === '--- 게임을 선택해주세요 ---'
                    ? rankingData.slice(0, 3).map((data, idx) => (
                        <li>
                          <div className="ranking-idx">
                            <p>{idx + 1}</p>
                          </div>
                          <div className="img-circle">
                            <img src={starIcon} alt="userImg" />
                          </div>
                          <p className="userId">{data.userNickname}</p>
                          {data.score && (
                            <p className="avg-score">{`SCORE: ${data.score}`}</p>
                          )}
                        </li>
                      ))
                    : rankingData.slice(0, 3).map((data, idx) => (
                        <li>
                          <div className="ranking-idx">
                            <p>{idx + 1}</p>
                          </div>
                          <div className="img-circle">
                            <img src={starIcon} alt="userImg" />
                          </div>
                          <p className="userId">{data.userNickname}</p>
                          <p className="avg-score">{`AVG: ${data.averageScore}`}</p>
                          <p className="high-score">{`HIGH: ${data.highScore}`}</p>
                        </li>
                      )))}
              </ul>
            </div>
          </div>
          <div className="all-ranking-section">
            <div className="section-header">
              <img src={heartIcon} alt="crownIcon" />
              <h2>All Users</h2>
              <div>
                <hr />
              </div>
            </div>
            {rankingData &&
              (selectedGame.gameTitle === '전체 랭킹' ||
              selectedGame.gameTitle === '--- 게임을 선택해주세요 ---' ? (
                <>
                  <div className="all-ranking-section-subtitle">
                    <div className="subtitle1">Ranking</div>
                    <div className="subtitle1">Id</div>
                    <div className="subtitle3">Score</div>
                  </div>
                  <div className="all-ranking-section-body">
                    <ul>
                      {rankingData.slice(3).map((data, idx) => (
                        <li>
                          <div className="ranking-idx">
                            <p>{idx + 3}</p>
                          </div>
                          <div className="img-circle">
                            <img src={starIcon} alt="userImg" />
                          </div>
                          <p className="userId">{data.userNickname}</p>
                          {data.score && <p className="score">{data.score}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="all-ranking-section-subtitle">
                    <div className="subtitle1">Ranking</div>
                    <div className="subtitle1">Id</div>
                    <div className="subtitle2">Avg Score</div>
                    <div className="subtitle2">High Score</div>
                  </div>
                  <div className="all-ranking-section-body">
                    <ul>
                      {rankingData.slice(3).map((data, idx) => (
                        <li>
                          <div className="ranking-idx">
                            <p>{idx + 3}</p>
                          </div>
                          <div className="img-circle">
                            <img src={starIcon} alt="userImg" />
                          </div>
                          <p className="userId">{data.userNickname}</p>
                          <p className="avg-score">{data.averageScore}</p>
                          <p className="high-score">{data.highScore}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ))}
          </div>
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

export default Lanking;
