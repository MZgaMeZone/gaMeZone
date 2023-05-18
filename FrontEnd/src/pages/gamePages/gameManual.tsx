import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../style/gameManual.css";
import exitImg from "../../style/icons/x-solid.svg";
import middleBarIcon from "../../style/icons/manual-icon1.svg";
import memoFavicon from "../../style/icons/memo_favicon.svg";

const GameManual = (props: { setShowManual: (show: boolean) => void }) => {
  const { setShowManual } = props;

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
            &emsp;•&emsp;•&emsp;•&emsp;1&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;2&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;3&emsp;•&emsp;•
          </p>
        </pre>
      </div>
      <div className="manual-container-body">
        <div>
          <p className="manual-content title1">게임 소개</p>
          <p className="manual-content-descript">
            10초 게임입니다 <br />
            10초를 잘 맞춰보면 됩니다. <br />
            10초를 정확히 맞추면 되는 게임입니다. <br />
            10초를 정확히 맞추면 되는 게임입니다. <br />
            10초를 정확히 맞추면 되는 게임입니다. <br />
            잘하셨습니다.
          </p>
          <p className="manual-content title2">게임 진행 방법</p>

          <p className="manual-content-descript">
            [lolo] 어쩌구 저쩌구 하는 버튼입니다. <br />
            [lulu] 어쩌구 저쩌구 하는 버튼입니다. <br />
            게임을 진행할 모드를 선택합니다. <br /> 10초가 되면 뭐를 클릭합니다.{" "}
            <br />
            얼만큼 맞추면 잘하는 겁니다
            <br />
            굿잡
            <br />
            잘하셨습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameManual;
