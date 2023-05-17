import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../style/gameRanking.css";
import exitImg from "../../style/icons/x-solid.svg";
import rankingFavicon from "../../style/icons/ranking_favicon.svg";

import { Link } from "react-router-dom";

const GameRanking = (props: { setShowranking: (show: boolean) => void }) => {
  const { setShowranking } = props;

  return (
    <div className="ranking-container">
      <div className="ranking-container-header">
        <div className="ranking-container-header-title">
          <img src={rankingFavicon} alt="rankingFavicon" />
          <p>랭킹</p>
        </div>
        <div
          className="exit-button"
          onClick={() => {
            setShowranking(false);
          }}
        >
          <img src={exitImg} alt="exitImg" />
        </div>
      </div>
      <div className="ranking-container-body"></div>
    </div>
  );
};

export default GameRanking;
