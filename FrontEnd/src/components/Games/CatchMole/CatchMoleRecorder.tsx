import React from 'react';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

interface userDataType {
  email?: string;
  nickname: string;
}

async function CatchMoleRecorder(
  navigate: NavigateFunction,
  score: number,
  userData: userDataType
) {
  const userToken: string | null = localStorage.getItem('userToken');
  const gameResult = {
    gameId: '64a56167ca850635fec2e2e7',
    userNickname: userData.nickname,
    userEmail: userData.email,
    gameUrl: 'CatchMole',
    totalScores: score,
    averageScore: score,
    highScore: score,
  };

  const NavigateToGameOver = () => {
    navigate('/game/gameOver', {
      state: {
        gameId: gameResult.gameUrl,
        userNickName: userData.nickname,
        userAverageScore: score,
        userHighScore: score,
      },
    });
  };

  if (!userToken) {
    NavigateToGameOver();
    return;
  }

  await axios
    .post(`${process.env.REACT_APP_API_URL}/api/scores`, gameResult)
    .catch((e) => console.error(e))
    .finally(() => {
      NavigateToGameOver();
    });
}

export default CatchMoleRecorder;
