import React from 'react';
import { rankingDataType } from '../../pages/RankingPage/ranking';

interface Top3BoxProps {
  userData: rankingDataType;
  index: number;
  perGame: boolean;
}

const Top3Box: React.FC<Top3BoxProps> = ({ userData, index, perGame }) => {
  return (
    <li key={userData.userNickname}>
      <div className="ranking-idx">
        <p>{index + 1}</p>
      </div>
      <div className="img-circle">
        <img
          src={`${process.env.REACT_APP_API_URL}/${userData.userIcon}`}
          alt="userImg"
        />
      </div>
      <p className="userId">{userData.userNickname}</p>
      {userData.score &&
        (perGame ? (
          <>
            <p className="avg-score">{`AVG: ${userData.averageScore}`}</p>
            <p className="high-score">{`HIGH: ${userData.highScore}`}</p>
          </>
        ) : (
          <p className="avg-score">{`SCORE: ${userData.score}`}</p>
        ))}
    </li>
  );
};

export default Top3Box;
