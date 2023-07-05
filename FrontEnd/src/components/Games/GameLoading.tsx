import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import '../../style/gameLoading.css';
import cdImg1 from '../../style/icons/cdImg1.svg';
import cdImg2 from '../../style/icons/cdImg2.svg';
import exitImg from '../../style/icons/x-solid.svg';
import paperImg from '../../style/icons/paper.svg';
import speedImg from '../../style/icons/speedImg.svg';
import ContainerHeader from '../Common/ContainerHeader';
import { ButtonDashedSmall } from '../Common/ButtonSmall';
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
    <LoadingContainer>
      <ContainerHeader
        favicon={loadingIcon}
        title="로딩 중"
        onClick={() => navigate(-1)}
      />
      <div className="loading-container-body">
        <div>
          <IconContainer>
            <CdIcons>
              <img src={cdImg1} alt="cdImg1" />
              <PaperSection>
                <img src={paperImg} alt="paper" />
              </PaperSection>
              <img src={cdImg2} alt="cdImg2" />
            </CdIcons>
            <SpeedLimit>
              <p>Speedlimit</p>
              <img src={speedImg} alt="speedImg" />
            </SpeedLimit>
          </IconContainer>
        </div>
        <LoadingDescription>
          <p>
            Estimated time left: 39years (Joke) <br />
            Transfer rate: 4.61 KB/Sec
          </p>
          <SpeedBox>
            <div style={{ width: `${speed}%` }}></div>
            <p style={{ color: speedFontColor }}>{speed}%</p>
          </SpeedBox>
        </LoadingDescription>
      </div>
      <LoadingContainerFooter>
        <p>게임을 로딩 중입니다.</p>
        <ButtonDashedSmall text="Cancel" onClick={() => navigate(-1)} />
      </LoadingContainerFooter>
    </LoadingContainer>
  );
};

export default GameLoading;

const LoadingContainer = styled.div`
  box-sizing: border-box;
  width: 80rem;
  height: 47.6rem;
  margin: 10rem auto auto auto;
  background: #c0c0c0;
  border: 1px solid #000000;
  box-shadow: 3px 3px 4px #1c1c1c;
  font-size: 2.5rem;
`;

const IconContainer = styled.div`
  height: 18rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

const CdIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  > img {
    width: 16rem;
    height: 16rem;
  }
`;

const slideAnimation = keyframes`
    0% {
    transform: translateX(-90%) translateY(-40%);
  }
  25% {
    transform: translateX(-50%) translateY(-80%);
  }
  50% {
    transform: translateX(-10%) translateY(-100%);
  }
  75% {
    transform: translateX(30%) translateY(-80%);
  }
  100% {
    transform: translateX(70%) translateY(-40%);
  }
`;

const PaperSection = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 12rem;
    height: 3.5rem;
    animation: ${slideAnimation} 2s linear infinite;
  }
`;

const SpeedLimit = styled.div`
  width: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    font-size: 2rem;
  }
  > img {
    width: 18rem;
    height: 4.5rem;
  }
`;

const LoadingDescription = styled.div`
  padding: 0 4rem;
  > p {
    font-size: 2.2rem;
  }
`;

const SpeedBox = styled.div`
  position: relative;
  width: 100%;
  height: 4rem;
  margin-top: 2.5rem;
  box-shadow: inset 0.4rem 0.4rem 0.4rem 0rem #0000003f,
    inset -0.2rem -0.2rem 0.2rem 0rem white;
  > div {
    position: absolute;
    height: 100%;
    width: 10%;
    background-color: #000080;
  }
  > p {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LoadingContainerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4rem;
`;
