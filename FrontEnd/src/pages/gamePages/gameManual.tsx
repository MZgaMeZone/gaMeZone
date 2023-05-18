import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../style/gameManual.css";
import exitImg from "../../style/icons/x-solid.svg";
import middleBarIcon from "../../style/icons/manual-icon1.svg";
import memoFavicon from "../../style/icons/memo_favicon.svg";

import ExampleManualData from "../../components/Games/sampleManualData";

interface manualDataType {
  gameTitle: string;
  gameCategory: string[];
  gameIconUrl: string;
  gameImageUrl: string;
  gameDescription: string;
  gameManual: string;
  gameServiceStatus: string;
}

const GameManual = (props: { setShowManual: (show: boolean) => void }) => {
  const { setShowManual } = props;
  const [manualData, setManualData] = useState<manualDataType[]>([]);

  useEffect(() => {
    setManualData(ExampleManualData);
  }, []);
  return (
    <div className="manual-container">
      <div className="manual-container-header">
        <div className="manual-container-header-title">
          <img src={memoFavicon} alt="manualFavicon" />
          <p>게임 설명</p>
        </div>
        <div
          className="exit-button"
          onClick={() => {
            setShowManual(false);
          }}
        >
          <img src={exitImg} alt="exitImg" />
        </div>
      </div>
      <div className="middle-bar">
        <pre className="middle-bar-box">
          <img
            src={middleBarIcon}
            className="middleIcon1"
            alt="middleBarIcon"
          />
          <img
            src={middleBarIcon}
            className="middleIcon2"
            alt="middleBarIcon"
          />
          <p>
            &emsp;•&emsp;•&emsp;•&emsp;1&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;2&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;3&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;4&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;5
          </p>
        </pre>
      </div>
      <div className="manual-container-body">
        {manualData &&
          manualData.map((data: manualDataType) => (
            <div key={data.gameTitle}>
              <p className="manual-content title1">게임 소개</p>
              <p className="manual-content-descript">{data.gameDescription}</p>
              <p className="manual-content title2">게임 진행 방법</p>

              <p className="manual-content-descript">{data.gameManual}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GameManual;
