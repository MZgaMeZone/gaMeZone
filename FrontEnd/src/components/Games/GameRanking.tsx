import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../../style/gameRanking.css';
import backgroundImg from '../../style/icons/ranking-background.png';
import rankingFavicon from '../../style/icons/ranking_favicon.svg';
import { RankingDataType } from '../../types/gameType';
import ContainerHeader from '../Common/ContainerHeader';

const GameRanking = (props: {
  setShowRanking: (show: boolean) => void;
  gameId: string | undefined;
}) => {
  const { setShowRanking, gameId } = props;
  const [rankingData, setRankingData] = useState<RankingDataType[]>([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/scores/${gameId}/avr/nonHnors/?num=10`
      )
      .then((res) => {
        setRankingData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="ranking-container">
      <ContainerHeader
        favicon={rankingFavicon}
        title="랭킹"
        onClick={() => {
          setShowRanking(false);
        }}
      />
      <div
        className="ranking-container-body"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="ranking-container-body-title">Ranking Zone</div>
        <div className="ranking-list">
          <ol>
            {rankingData &&
              rankingData.map((data: RankingDataType, idx: number) => (
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
