import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../style/gameLayout.css";
import { Link, useParams } from "react-router-dom";
import TimeStopGame from "../../components/Games/StopWatch/timeStop";

import exitImg from "../../style/icons/x-solid.svg";
import gameFavicon from "../../style/icons/game_favicon.svg";

const GameLayout = () => {
  const [gameName, setGameName] = useState<string>("");
  const { id } = useParams();

  //게임 props로 전달받은 게임 이름 설정(헤더 타이틀에 렌더링)
  const handleGameName = (name: string) => {
    setGameName(name);
  };

  //게임 컴포넌트 렌더링
  let gameComponent;
  switch (id) {
    case "timeStopGame":
      gameComponent = <TimeStopGame setGameName={handleGameName} />;
      break;
    default:
      gameComponent = <div>Invalid Game ID</div>;
  }

  return (
    <div className="game-container">
      <div className="game-container-header">
        <div className="game-container-header-title">
          <img src={gameFavicon} alt="gameFavicon" />
          <p>{gameName}</p>
        </div>
        <Link to="/" className="exit-button">
          <img src={exitImg} alt="exitImg" />
        </Link>
      </div>
      <div className="game-container-body">{gameComponent}</div>
      <div className="game-container-footer">
        <div className="footer-box"></div>
        <div className="footer-box"></div>
        <div className="footer-box"></div>
      </div>
    </div>
  );
};

export default GameLayout;
