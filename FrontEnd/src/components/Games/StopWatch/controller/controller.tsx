import React from "react";
import Now from "../../../Tools/Timer";

type ControllerProps = {
  scores: any[];
  setScores: React.Dispatch<React.SetStateAction<any[]>>;
  printScore: any[];
  setPrintScore: React.Dispatch<React.SetStateAction<any[]>>;
  gameModeChecker: string;
  setGameModeChecker: React.Dispatch<React.SetStateAction<string>>;
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

  const scores = props.scores;
  const setScores = props.setScores;
  //   const printScore = props.printScore;
  const setPrintScore = props.setPrintScore;
  const gameModeChecker = props.gameModeChecker;
  const setGameModeChecker = props.setGameModeChecker;
  // 게임 시작 버튼
  function gameStart() {
    const start = new Date();
    setInitTime([Now(start), start]);
    setStartButton(false);
    setEndButton(true);
    setShowScore(true);
    if (showTime) {
      setGameModeChecker("visible");
    } else {
      setGameModeChecker("blind");
    }
  }
  // 게임 종료 버튼
  function gameFinish() {
    const end = new Date();
    setEndTime([Now(end), end]);
    setEndButton(false);
    setShowScore(true);
    setRestartButton(true);
    if (initTime && end) {
      const elapsedTime = (end.getTime() - initTime[1].getTime()) / 1000;
      setElapsedTime(elapsedTime);
      setScores([...scores, [elapsedTime, gameModeChecker]]);
      // localStorage.setItem("score", JSON.stringify([...scores, elapsedTime])); // 로컬스토리지 사용 보류
    }
    // ----------------로컬스토리지를 활용하는 방법 - 사용 보류 ----------------------
    // const scoreData = localStorage.getItem("score");
    // if (scoreData && scoreData.length > 0) {
    //   const newScoreData = JSON.parse(scoreData);
    //   newScoreData.push(elapsedTime);
    //   localStorage.setItem("score", JSON.stringify(newScoreData));
    // } else {
    //   const newScoreData = [elapsedTime];
    //   localStorage.setItem("score", JSON.stringify(newScoreData));
    // }
    // ----------------------------------------------------------------------------
  }

  // 게임 리셋 기능 : 버튼 및 기록 초기화
  function resetGame() {
    setInitTime(null);
    setEndTime(null);
    setStartButton(true);
    setShowScore(false);
    setRestartButton(false);
    setGameModeChecker("blind");
  }

  // 경과시간을 볼지 말지 결정하는 기능
  function visibleTime() {
    setShowTime(!showTime);
    setGameModeChecker("visible"); // 한번이라도 모드 변경했으면 무조건 visible 모드
  }

  // 경과시간을 출력하는 부분 - 기존 코드
  // 아래 개선된 코드와 비교하여 완벽하게 이해하고 나서 삭제할 것.
  // React.useEffect(() => {
  //   if (initTime && !endTime) {
  //     const nowTime = initTime[1].getTime();
  //     const intervalId = setInterval(() => {
  //       setElapsedTime((new Date().getTime() - nowTime) / 1000);
  //     }, 50);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [initTime, endTime]);

  // 경과시간을 출력하는 부분
  // [효율성 개선 by GPT] (기존)setInterval => (개선)AnimationFrame
  // 참고자료 : https://developer.mozilla.org/ko/docs/Web/API/window/requestAnimationFrame
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

  // ----------------로컬스토리지를 활용하는 방법 - 사용 보류 ----------------------
  // React.useEffect(() => {
  //   const scoreData = localStorage.getItem("score");
  //   if (scoreData && scoreData.length > 0) {
  //     const parsedScoreData = JSON.parse(scoreData);
  //     if (JSON.stringify(parsedScoreData) !== JSON.stringify(scoreData)) {
  //       setScores(parsedScoreData);
  //       console.log("무한루프체크5");
  //     }
  //   } else {
  //     console.log("무한루프체크6");
  //     setScores([]);
  //   }
  // }, []);
  // ----------------------------------------------------------------------------

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
        bestScore[0],
        worstScore[0],
        averageScore.toFixed(3),
      ];
      setPrintScore(finalMessage);
    } else {
      setPrintScore([]);
    }
  }, [scores, setPrintScore]);

  return (
    <>
      <div className="gamebox">
        <div>
          <span>
            게임 모드{" "}
            <button
              onClick={() => {
                alert("아직 미구현 기능입니다. DB연결 후 제공됩니다.");
              }}
            >
              연습
            </button>
          </span>
          <br />
          <span id="game-title">10초를 정확히 맞춰라!!</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          Game Mode
          {true && (
            <button id="option-button" onClick={visibleTime}>
              {showTime ? "시간 공개" : "시간 미공개"}
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
                <span> 경과 시간... {elapsedTime?.toFixed(3)}</span>
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
          <div>게임 시작 시간 : {initTime && initTime[0]}</div>
          <div>게임 종료 시간 : {endTime && endTime[0]}</div>
          {showScore && endTime && (
            <div>
              당신의 기록 : {elapsedTime}초 ({gameModeChecker} mode)
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Controller;
