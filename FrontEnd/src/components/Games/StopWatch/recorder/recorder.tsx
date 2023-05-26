import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type RecorderProps = {
  scores: any[];
  setScores: React.Dispatch<React.SetStateAction<any[]>>;
  printScore: any[];
  setPrintScore: React.Dispatch<React.SetStateAction<any[]>>;
  gameModeChecker: string;
  // setGameModeChecker: React.Dispatch<React.SetStateAction<string>>;
  gameMode: string;
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
};

interface userDataType {
  email?: string;
  nickname: string;
}

const url = process.env.REACT_APP_API_URL;
const userToken: string | null = localStorage.getItem('userToken');
const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

function Recorder(props: RecorderProps) {
  const scores = props.scores;
  const setScores = props.setScores;
  const printScore = props.printScore;
  const setPrintScore = props.setPrintScore;
  const gameModeChecker = props.gameModeChecker;
  const gameMode = props.gameMode;
  const setGameMode = props.setGameMode;
  const navigate = useNavigate();

  const [userData, setUserData] = useState<userDataType>({
    nickname: 'Anonymous',
  });

  useEffect(() => {
    if (userToken) {
      axios
        .get(url + '/api/users', config)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((e) => {
          setUserData({ nickname: 'Anonymous' });
        });
    }
  }, []);

  // 현재 저장된 기록을 제출하려고함.
  function scoreSubmit(
    score: string[],
    highscore: number,
    averagescore: string
  ) {
    const data = {
      gameId: '64673c9e003fef9471f58799', // 나중에 state로 관리
      userNickname: userData.nickname, // 나중에 token으로 관리
      userEmail: userData.email,
      gameUrl: '10seconds',
      totalScores: score,
      averageScore: averagescore,
      highScore: highscore,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/scores`, data)
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e));
  }

  function grade(num: number): string {
    const timeGap = Math.abs(num - 10);
    let gameScore = '🤔Bad';
    // let gameMode = "Blind";
    // if (mode === 1) {
    //   gameMode = "";
    // }
    if (timeGap === 0) {
      gameScore = '👑Perfect';
    } else if (timeGap < 0.01) {
      gameScore = '😎Excellent';
    } else if (timeGap < 0.05) {
      gameScore = '😄Great';
    } else if (timeGap < 0.1) {
      gameScore = '😃Nice';
    } else if (timeGap < 0.15) {
      gameScore = '😠So so';
    }
    return gameScore;
  }

  return (
    <>
      {/* 기록실 부분 */}
      <div className="record-board">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: ' rgb(194, 200, 201)',
            padding: '0.7rem 0.7rem',
          }}
        >
          기록실
        </div>
        <ul id="recordboard">
          {scores.map((score, index) => (
            <li key={index}>
              {index + 1}회차 : {score[0]}초 {grade(score[0])} [{score[1]}]
            </li>
          ))}
        </ul>
      </div>
      {scores.length > 0 && (
        <>
          <div id="best-record-text">최고 기록 : {printScore[0]}%</div>
          <div id="worst-record-text">최저 기록 : {printScore[1]}%</div>
          <div id="average-gap-text">평균 기록 : {printScore[2]}%</div>
          <div id="average-gap-text">
            당신의 평균 등급은 {grade(printScore[2] / 10)} 입니다!
          </div>
          <div id="gap-box"></div>
        </>
      )}
      <div
        style={{
          display: 'flex',
          paddingTop: '1rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
        }}
      >
        <button
          id="reset-button"
          onClick={() => {
            setScores([]);
            // localStorage.clear(); // 로컬스토리지 사용 보류
          }}
        >
          Reset
        </button>
        {gameMode === '도전' && (
          <button
            id="submit-button"
            onClick={() => {
              if (scores.length >= 5) {
                scoreSubmit(scores, printScore[0], printScore[2]);
                alert('기록 제출이 완료되었습니다!');
                setScores([]);
                //게임 오버로 데이터 넘깁시다
                navigate('/game/gameOver', {
                  state: {
                    gameId: '10seconds', // 나중에 state로 관리
                    userNickName: userData.nickname, //나중에 token으로 관리
                    userAverageScore: printScore[2],
                    userHighScore: printScore[0],
                  },
                });
              } else {
                alert('5회 이상 진행해야 기록 제출 가능합니다.');
              }
            }}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
}

export default Recorder;
