import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../style/gameOver.css";
import { Link, useParams } from "react-router-dom";

import gameoverBgImg from "../../style/icons/gameover-bg-img.svg";
import MainBody from "../mainPage/main-body";
import MainFooter from "../mainPage/main-footer";
import { fontFamily } from "@mui/system";

const GameOver = () => {
  const [mainModal, setMainModal] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>("");
  const { id } = useParams();

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
      <div
        className="game-over"
        style={{
          backgroundImage: `url(${gameoverBgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="game-over-header">
          <p>***&nbsp;GAME OVER&nbsp;***</p>
        </div>
        <div className="game-over-body">
          <div className="game-over-body-top">
            <div className="game-over-body-title">UPDATED RANKING</div>
            <div className="user-score">
              <span>
                <span>USERID: </span>
                <span>GOGUMA, &nbsp;</span>
              </span>
              <span>
                <span>AVG:</span>
                <span>1000, &nbsp;</span>
                <span>HIGH:</span>
                <span>1000</span>
              </span>
            </div>
          </div>
          <div className="game-over-nav">
            <span className="ranking">RANKING</span>
            <span className="id">ID</span>
            <span className="avgscore">AVG SCORE</span>
            <span className="highscore">HIGH SCORE</span>
          </div>
          <div className="ranking-content">
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
            <ul className="ranking-item">
              <li className="ranking-idx">1.</li>
              <li className="id-li">gomao</li>
              <li className="score-li avg">1000</li>
              <li className="score-li high">1000</li>
            </ul>
          </div>
        </div>
        <div className="game-over-footer">
          <button className="btn to-main">MAIN</button>
          <button className="btn to-retry">RETRY</button>
        </div>
      </div>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default GameOver;
