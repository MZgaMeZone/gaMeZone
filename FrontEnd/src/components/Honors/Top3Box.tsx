import React from 'react';
import styled from 'styled-components';
import { Top3BoxProps } from '../../types/gameType';

const Top3Box: React.FC<Top3BoxProps> = ({ userData, index, perGame }) => {
  return (
    <RankingLi key={userData.userNickname}>
      <RankingIndex>
        <p>{index + 1}</p>
      </RankingIndex>
      <UserImg>
        <img
          src={`${process.env.REACT_APP_API_URL}/${userData.userIcon}`}
          alt="userImg"
        />
      </UserImg>
      <UserId>{userData.userNickname}</UserId>
      {perGame
        ? userData.averageScore &&
          userData.highScore && (
            <>
              <p>{`AVG: ${userData.averageScore}`}</p>
              <p>{`HIGH: ${userData.highScore}`}</p>
            </>
          )
        : userData.score && <p>{`SCORE: ${userData.score}`}</p>}
    </RankingLi>
  );
};

export default Top3Box;

const RankingLi = styled.li`
  width: 28%;
  height: 22rem;
  box-shadow: inset 0.4rem 0.4rem 0.4rem 0rem #0000007f,
    inset -0.4rem -0.4rem 0.4rem 0rem #ffffff7f;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RankingIndex = styled.div`
  width: 4rem;
  position: absolute;
  font-size: 3rem;
  text-align: center;
  top: -1.5rem;
  background-color: #c0c0c0;
`;

const UserImg = styled.div`
  width: 7rem;
  height: 7rem;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
`;

const UserId = styled.p`
  font-size: 3rem;
  padding: 1rem;
`;
