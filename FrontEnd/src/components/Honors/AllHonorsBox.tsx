import React from 'react';
import styled from 'styled-components';
import { AllHonorsBoxProps } from '../../types/gameType';

const AllHonorsBox: React.FC<AllHonorsBoxProps> = ({
  userData,
  index,
  perGame,
}) => {
  return (
    <RankingLi key={userData.userNickname}>
      <RankingIndex>
        <p>{index + 4}</p>
      </RankingIndex>
      <UserImg>
        <img
          src={`${process.env.REACT_APP_API_URL}/${userData.userIcon}`}
          alt="userImg"
        />
      </UserImg>
      <UserId>{userData.userNickname}</UserId>
      {perGame ? (
        <>
          <AvgScore>{userData.averageScore}</AvgScore>
          <HighScore>{userData.highScore}</HighScore>
        </>
      ) : (
        <Score>{userData.score}</Score>
      )}
    </RankingLi>
  );
};

export default AllHonorsBox;

const RankingLi = styled.li`
  width: 93%;
  height: 10rem;
  margin: 0 auto 1.1rem auto;
  box-shadow: inset 0.4rem 0.4rem 0.4rem 0rem #0000007f,
    inset -0.4rem -0.4rem 0.4rem 0rem #ffffff7f;
  display: flex;
  align-items: center;
`;

const RankingIndex = styled.div`
  flex: 1.2;
  text-align: center;
`;

const UserImg = styled.div`
  width: 7rem;
  height: 7rem;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
`;

const UserId = styled.p`
  flex: 2.8;
  padding-left: 5rem;
`;

const AvgScore = styled.p`
  flex: 1.6;
  text-align: start;
`;
const HighScore = styled.p`
  flex: 1.3;
  text-align: start;
`;

const Score = styled.p`
  flex: 2.9;
  text-align: start;
`;
