import React, { useState, useEffect } from 'react';
import { get } from '../../api/api';
import styled from 'styled-components';
import backgroundImg from '../../style/icons/ranking-background.png';
import rankingFavicon from '../../style/icons/ranking.svg';
import { RankingDataType } from '../../types/gameType';
import ContainerHeader from '../Common/ContainerHeader';

const GameRanking = (props: {
  setShowRanking: (show: boolean) => void;
  gameId: string | undefined;
}) => {
  const { setShowRanking, gameId } = props;
  const [rankingData, setRankingData] = useState<RankingDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await get<RankingDataType[]>(
        `/api/scores/${gameId}/avr/nonHnors/?num=10`
      );
      setRankingData(responseData.data);
    };
    fetchData();
  }, []);

  return (
    <RankingContainer>
      <ContainerHeader
        favicon={rankingFavicon}
        title="랭킹"
        onClick={() => {
          setShowRanking(false);
        }}
      />
      <ContainerBody style={{ backgroundImage: `url(${backgroundImg})` }}>
        <BodyTitle>Ranking Zone</BodyTitle>
        <RankingList>
          <ol>
            {rankingData &&
              rankingData.map((data: RankingDataType, idx: number) => (
                <li key={data.createdAt}>
                  <RankinIndex>{`${idx + 1}.`}</RankinIndex>
                  <UserId>{data.userNickname}</UserId>
                  <UserScore>{data.averageScore}</UserScore>
                </li>
              ))}
          </ol>
        </RankingList>
      </ContainerBody>
    </RankingContainer>
  );
};

export default GameRanking;

const RankingContainer = styled.div`
  font-family: 'neodgm', cursive;
  height: 71.5rem;
  width: 43rem;
  margin: 10rem auto auto auto;
  background: #c0c0c0;
  border: 1px solid #000000;
  box-shadow: 3px 3px 4px #1c1c1c;
  font-size: 2.5rem;
  display: inline-block;
`;

const ContainerBody = styled.div`
  width: 93%;
  height: 85%;
  margin: 1.5rem auto;
  padding: 4rem;
  color: white;
  box-shadow: inset 0.2rem 0.2rem 0.3rem 0rem #161616cc;
`;

const BodyTitle = styled.div`
  text-align: center;
  font-size: 3.7rem;
  text-shadow: 1px 1px 4px #ff00fe, -1px -1px 3px rgb(0, 236, 236);
  margin: 1.3rem auto;
`;

const RankingList = styled.div`
  > ol {
    margin: 4rem auto;
    li {
      display: flex;
    }
  }
`;

const RankinIndex = styled.span`
  flex: 1.5;
  padding-top: 0.3rem;
  font-size: 3rem;
`;

const UserId = styled.p`
  flex: 4;
  font-size: 2.7rem;
`;

const UserScore = styled.p`
  flex: 2;
  text-align: end;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;
