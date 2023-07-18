import React from 'react';
import Now from '../../../Tools/Timer';

type ControllerProps = {
  scores: [number, string][];
  setScores: React.Dispatch<React.SetStateAction<[number, string][]>>;
  printScore: string[];
  setPrintScore: React.Dispatch<React.SetStateAction<string[]>>;
  gameModeChecker: string;
  setGameModeChecker: React.Dispatch<React.SetStateAction<string>>;
  gameMode: string;
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
};

function Controller(props: ControllerProps) {
  const [initTime, setInitTime] = React.useState<[string, Date] | null>(null);
  const [endTime, setEndTime] = React.useState<[string, Date] | null>(null);
  const [startButton, setStartButton] = React.useState(true);
  const [endButton, setEndButton] = React.useState(false);
  const [restartButton, setRestartButton] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState<number | null>(null);
  const [showScore, setShowScore] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);
  const {
    scores,
    setScores,
    setPrintScore,
    gameModeChecker,
    setGameModeChecker,
    gameMode,
    setGameMode,
  } = props;

  // 게임 시작 버튼
  function gameStart() {
    const start = new Date();
    setInitTime([Now(start), start]);
    setStartButton(false);
    setEndButton(true);
    setShowScore(true);
    if (showTime) {
      setGameModeChecker('visible');
    } else {
      setGameModeChecker('blind');
    }
  }
  // 게임 종료 버튼 - scores배열에 새 기록을 저장하는 로직.
  function gameFinish() {
    const end = new Date();
    setEndTime([Now(end), end]);
    setEndButton(false);
    setShowScore(true);
    setRestartButton(true);
    if (initTime && end) {
      const elapsedTime = (end.getTime() - initTime[1].getTime()) / 1000;
      setElapsedTime(elapsedTime);
      if (elapsedTime >= 20) {
        setScores([...scores, [0, gameModeChecker]]);
      } else {
        setScores([...scores, [elapsedTime, gameModeChecker]]);
      }
    }
  }

  // 게임 리셋 기능 : 버튼 및 기록 초기화
  function resetGame() {
    setInitTime(null);
    setEndTime(null);
    setStartButton(true);
    setShowScore(false);
    setRestartButton(false);
    setGameModeChecker('blind');
  }

  // 경과시간을 볼지 말지 결정하는 기능
  function visibleTime() {
    setShowTime(!showTime);
    setGameModeChecker('visible'); // 한번이라도 모드 변경했으면 무조건 visible 모드
  }
  React.useEffect(() => {
    let intervalId: number;
    let lastTime: number;
    const tick = () => {
      if (initTime) {
        setElapsedTime((new Date().getTime() - initTime[1].getTime()) / 1000);
        intervalId = requestAnimationFrame(tick);
      }
    };
    if (initTime && !endTime) {
      lastTime = new Date().getTime();
      intervalId = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(intervalId);
  }, [initTime, endTime]);

  // 기록된 누적 데이터의 분석을 보여주는 부분.
  React.useEffect(() => {
    if (scores && scores.length > 0) {
      const bestScore = scores.reduce((prev, curr) => {
        const before = Math.abs(prev[0] - 10);
        const after = Math.abs(curr[0] - 10);
        return before < after ? prev : curr;
      }, scores[0]);
      const worstScore = scores.reduce((prev, curr) => {
        const before = Math.abs(prev[0] - 10);
        const after = Math.abs(curr[0] - 10);
        return before > after ? prev : curr;
      }, scores[0]);
      const averageScore =
        scores.reduce((acc, cur) => acc + Math.abs(cur[0] - 10), 0) /
        scores.length;
      const finalMessage = [
        ((10 - Math.abs(bestScore[0] - 10)) * 10).toFixed(2),
        ((10 - Math.abs(worstScore[0] - 10)) * 10).toFixed(2),
        ((100 * (10 - averageScore)) / 10).toFixed(2),
      ];
      setPrintScore(finalMessage);
    } else {
      setPrintScore([]);
    }
  }, [scores, setPrintScore]);

  return (
    <>
      <div className="gamebox">
        <div style={{ padding: '0.5rem 0.5rem' }}>
          <div
            style={{
              margin: '1rem 1rem',
              display: 'flex',
              fontSize: '19px',
            }}
          >
            게임 모드
            <button
              id="mode-button"
              onClick={() => {
                let newMode = gameMode;
                if (scores.length > 0) {
                  alert('게임 진행 중에는 모드 변경이 불가합니다.');
                } else {
                  if (newMode === '연습') {
                    newMode = '도전';
                  } else {
                    newMode = '연습';
                  }
                  setGameMode(newMode);
                }
              }}
            >
              {gameMode}
            </button>
          </div>
          <span id="game-title">10초를 정확히 맞춰라!!</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            fontSize: '17px',
          }}
        >
          Game Mode
          {true && (
            <button id="option-button" onClick={visibleTime}>
              {showTime ? '시간 공개' : '시간 미공개'}
            </button>
          )}
        </div>
        <div>
          {startButton && (
            <button id="game-button" onClick={gameStart}>
              Start!!
            </button>
          )}
          {endButton && (
            <div>
              <button id="game-button" onClick={gameFinish}>
                Finish
              </button>
              {showTime ? (
                <div
                  style={{
                    display: 'inline-flex',
                    fontSize: '16px',
                    padding: '0.5rem 0.5rem',
                    marginTop: '0.3rem',
                    marginLeft: '0.7rem',
                  }}
                >
                  경과 시간... {elapsedTime?.toFixed(3)}
                </div>
              ) : (
                <div className="blindmode-text">
                  <span> Blind Mode로 진행 중입니다.. </span>
                </div>
              )}
            </div>
          )}
          {restartButton && (
            <button id="game-button" onClick={resetGame}>
              Restart
            </button>
          )}
        </div>
        <div id="game-start-end-time">
          <div id="gametimer">게임 시작 시간 : {initTime && initTime[0]}</div>
          <div id="gametimer">게임 종료 시간 : {endTime && endTime[0]}</div>
          {showScore && endTime && (
            <div id="gametimer">
              당신의 기록 : {elapsedTime}초 ({gameModeChecker} mode)
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Controller;
