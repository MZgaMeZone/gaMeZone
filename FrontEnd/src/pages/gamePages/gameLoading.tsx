import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./gameLoading.css";
import cdImg1 from "./src/cdImg1.svg";
import cdImg2 from "./src/cdImg2.svg";
import exitImg from "./src/x-solid.svg";
import paperImg from "./src/paper.svg";
import speedImg from "./src/speedImg.svg";
import { Link } from "react-router-dom";

const GameLoading = () => {
  const [speed, setSpeed] = useState(0);
  const [speedFontColor, setSpeedFontColor] = useState("#000");

  useEffect(() => {
    setTimeout(() => {
      setSpeed(10);
    }, 1000);
    setTimeout(() => {
      setSpeed(25);
    }, 2000);
    setTimeout(() => {
      setSpeed(33);
    }, 3000);
    setTimeout(() => {
      setSpeedFontColor("#ffffff");
      setSpeed(68);
    }, 4000);
    setTimeout(() => {
      setSpeed(100);
    }, 5000);
  }, []);

  return (
    <div className="container">
      <div className="container-header">
        <p className="container-header-title">로딩 중</p>
        <Link to="/" className="exit-button">
          <img src={exitImg} alt="exitImg" />
        </Link>
      </div>
      <div className="container-body">
        <div>
          <div className="icon-container">
            <div className="cd-icon-container">
              <img className="cd-img1" src={cdImg1} alt="cdImg1" />
              <div className="paper-section">
                <img className="paper-img" src={paperImg} alt="paper" />
              </div>
              <img className="cd-img2" src={cdImg2} alt="cdImg2" />
            </div>
            <div className="speed-limit">
              <p>Speedlimit</p>
              <img src={speedImg} alt="speedImg" />
            </div>
          </div>
        </div>
        <div className="about-loading">
          <p>
            Estimated time left: 39years (Joke) <br />
            Transfer rate: 4.61 KB/Sec
          </p>
          <div className="speedbox">
            <div className="speedbox-blue" style={{ width: `${speed}%` }}></div>
            <p style={{ color: speedFontColor }}>{speed}%</p>
          </div>
        </div>
      </div>
      <div className="container-footer">
        <p>게임을 로딩 중입니다.</p>
        <Link to="/" className="cancel-btn">
          <div className="btn-border">Cancel</div>
        </Link>
      </div>
    </div>
  );
};

export default GameLoading;
