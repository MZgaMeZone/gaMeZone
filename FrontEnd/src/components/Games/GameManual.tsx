import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../../style/gameManual.css';
import middleBarIcon from '../../style/icons/manual-icon1.svg';
import memoFavicon from '../../style/icons/memo_favicon.svg';
import { manualDataType } from '../../types/gameType';
import ContainerHeader from '../Common/ContainerHeader';

const GameManual = (props: {
  setShowManual: (show: boolean) => void;
  gameId: string | undefined;
}) => {
  const { setShowManual, gameId } = props;
  const [manualData, setManualData] = useState<manualDataType>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/games/${gameId}`)
      .then((res) => {
        setManualData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="manual-container">
      <ContainerHeader
        favicon={memoFavicon}
        title="게임 설명"
        onClick={() => {
          setShowManual(false);
        }}
      />
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
        {manualData && (
          <div key={manualData._id}>
            <p className="manual-content title1">게임 소개</p>
            <p className="manual-content-descript">
              {manualData.gameDescription}
            </p>
            <p className="manual-content title2">게임 진행 방법</p>

            <p className="manual-content-descript">{manualData.gameManual}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameManual;
