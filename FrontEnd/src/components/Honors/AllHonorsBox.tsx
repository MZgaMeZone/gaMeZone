import React from 'react';
import { rankingDataType } from '../../pages/RankingPage/ranking';

interface AllHonorsBox {
  userData: rankingDataType;
  index: number;
  perGame: boolean;
}

const AllHonorsBox: React.FC<AllHonorsBox> = ({ userData, index, perGame }) => {
  return (
    <li key={userData.userNickname}>
      <div className="ranking-idx">
        <p>{index + 4}</p>
      </div>
      <div className="img-circle">
        <img
          src={`${process.env.REACT_APP_API_URL}/${userData.userIcon}`}
          alt="userImg"
        />
      </div>
      <p className="userId">{userData.userNickname}</p>
      {perGame ? (
        <>
          <p className="avg-score">{userData.averageScore}</p>
          <p className="high-score">{userData.highScore}</p>
        </>
      ) : (
        <p className="score">{userData.score}</p>
      )}
    </li>
  );
};

export default AllHonorsBox;
