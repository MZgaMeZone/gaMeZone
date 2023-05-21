import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import '../../style/gameRanking.css';
import exitImg from '../../style/icons/x-solid.svg';
import backgroundImg from '../../style/icons/ranking-background.png';
import rankingFavicon from '../../style/icons/ranking_favicon.svg';

import ExampleRankingData from '../../components/Games/sampleRankingData';

interface rankingDataType {
  gameId: string;
  userNickname: string;
  averageScore: number;
  highScore: number;
  createdAt: string;
  updatedAt: string;
}

const GameRanking = (props: {
  setShowRanking: (show: boolean) => void;
  gameId: string | undefined;
}) => {
  const { setShowRanking, gameId } = props;
  const [rankingData, setRankingData] = useState<rankingDataType[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/scores/${gameId}/avr?num=10`)
      .then((res) => {
        setRankingData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    // setRankingData(ExampleRankingData);
  }, []);

  return (
    <div className="ranking-container">
      <div className="ranking-container-header">
        <div className="ranking-container-header-title">
          <img src={rankingFavicon} alt="rankingFavicon" />
          <p>랭킹</p>
        </div>
        <div
          className="exit-button"
          onClick={() => {
            setShowRanking(false);
          }}
        >
          <img src={exitImg} alt="exitImg" />
        </div>
      </div>
      <div
        className="ranking-container-body"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="ranking-container-body-title">Ranking Zone</div>
        <div className="ranking-list">
          <ol>
            {rankingData &&
              rankingData.map((data: rankingDataType, idx: number) => (
                <li key={data.createdAt}>
                  <span className="ranking-list-idx">{`${idx + 1}.`}</span>
                  <p className="ranking-list-userID">{data.userNickname}</p>
                  <p className="ranking-list-score">{data.averageScore}</p>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default GameRanking;
