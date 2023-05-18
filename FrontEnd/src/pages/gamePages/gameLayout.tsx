import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../style/gameLayout.css";
import { Link, useParams } from "react-router-dom";
import GameLoading from "./gameLoading";
import GameRanking from "./gameRanking";
import TimeStopGame from "../../components/Games/StopWatch/timeStop";

import exitImg from "../../style/icons/x-solid.svg";
import gameFavicon from "../../style/icons/game_favicon.svg";
import MainBody from "../mainPage/main-body";
import MainFooter from "../mainPage/main-footer";
import { fontFamily } from "@mui/system";

const GameLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showranking, setShowranking] = useState<Boolean>(false);
  const [mainModal, setMainModal] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>("");
  const { id } = useParams();

  //게임 props로 전달받은 게임 이름 설정(헤더 타이틀에 렌더링)
  const handleGameName = (name: string) => {
    setGameName(name);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setShowranking(true);
    }, 6000);
  }, []);

  //게임 컴포넌트 렌더링
  let gameComponent;
  switch (id) {
    case "game1":
      gameComponent = <TimeStopGame setGameName={handleGameName} />;
      break;
    default:
      gameComponent = <div>Invalid Game ID</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#008080",
        height: "100vh",
        width: "100vw",
        minHeight: "880px",
        minWidth: "900px",
      }}
    >
      {isLoading ? (
        <GameLoading />
      ) : (
        <div className="game-body">
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
            <nav>
              <p>게임설명</p>
              <p
                onClick={() => {
                  setShowranking((current) => !current);
                }}
              >
                랭킹
              </p>
            </nav>
            <div className="game-container-body">{gameComponent}</div>
            <div className="game-container-footer">
              <div className="footer-box"></div>
              <div className="footer-box"></div>
              <div className="footer-box"></div>
            </div>
          </div>
          <>
            {showranking ? (
              <GameRanking setShowranking={setShowranking} />
            ) : null}
          </>
        </div>
      )}
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default GameLayout;
