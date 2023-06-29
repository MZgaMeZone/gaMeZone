import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../style/gameLoading.css';
import cdImg1 from '../../style/icons/cdImg1.svg';
import cdImg2 from '../../style/icons/cdImg2.svg';
import exitImg from '../../style/icons/x-solid.svg';
import paperImg from '../../style/icons/paper.svg';
import speedImg from '../../style/icons/speedImg.svg';
import ContainerHeader from '../Common/ContainerHeader';
import loadingIcon from '../../style/icons/loading.svg';

const GameLoading = () => {
  const navigate = useNavigate();
  const [speed, setSpeed] = useState(0);
  const [speedFontColor, setSpeedFontColor] = useState('#000');

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
      setSpeedFontColor('#ffffff');
      setSpeed(68);
    }, 4000);
    setTimeout(() => {
      setSpeed(100);
    }, 5000);
  }, []);

  return (
    <div className="loading-container">
      <ContainerHeader
        favicon={loadingIcon}
        title="로딩 중"
        onClick={() => navigate(-1)}
      />
      <div className="loading-container-body">
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
      <div className="loading-container-footer">
        <p>게임을 로딩 중입니다.</p>
        <Link to="/" className="cancel-btn">
          <div className="btn-border">Cancel</div>
        </Link>
      </div>
    </div>
  );
};

export default GameLoading;
