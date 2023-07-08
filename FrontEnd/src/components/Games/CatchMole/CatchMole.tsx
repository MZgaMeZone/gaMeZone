import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import backGroundImg from '../../../style/images/CatchMoleBackground.svg';
import moleImg from '../../../style/images/mole.svg';
import blackMoleImg from '../../../style/images/blackMole.svg';
import goldMoleImg from '../../../style/images/goldMole.svg';

import playButton from '../../../style/icons/play_button.svg';
import hammer from '../../../style/icons/hammer.svg';
import hammerDown from '../../../style/icons/hammer_down.svg';

function CatchMole(props: { setGameName: (name: string) => void }) {
  const { setGameName } = props;
  const [showReady, setshowReady] = useState<boolean>(true);
  const [showMoles, setShowMoles] = useState<number[]>([]);
  const [leftTime, setLeftTime] = useState<number>(60);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setGameName('두더지 게임 준비 중');
  });

  const handlePlayButton = () => {
    setshowReady(false);
    handleShowMoles();
  };

  let moleInterval: NodeJS.Timer;
  const handleShowMoles = () => {
    moleInterval = setInterval(() => {
      let BooleanArray: number[] = [];
      for (let i = 0; i < 9; i++) {
        let randomValue = Math.random();
        if (randomValue < 0.9) {
          BooleanArray.push(0);
        } else {
          BooleanArray.push(randomValue);
        }
      }
      setShowMoles(BooleanArray);
      TimeDown();
    }, 1700);
  };

  const TimeDown = () => {
    setLeftTime((prevTime) => {
      let updatedTime = prevTime;
      if (updatedTime === 0) {
        clearInterval(moleInterval);
        alert('gameover');
      } else {
        updatedTime = prevTime - 1;
      }
      return updatedTime;
    });
  };

  const handleMoleClick = () => {
    setScore((prevScore) => prevScore + 1);
  };
  return (
    <Container>
      {showReady && (
        <ReadyContainer>
          <ReadyMask></ReadyMask>
          <ReadyBody>
            <p>PRESS PLAY</p>
            <PlayButtonImg
              src={playButton}
              alt="플레이버튼"
              onClick={() => handlePlayButton()}
            />
          </ReadyBody>
        </ReadyContainer>
      )}
      <GameContainer>
        <GameHeader>
          <div>
            SCORE: <span>{score}</span>
          </div>
          <div>
            TIMER: <LeftTime leftTime={leftTime}>{leftTime}</LeftTime>
          </div>
        </GameHeader>
        <GameBody>
          {showMoles.map((showMole, index) => (
            <div key={'mole' + index}>
              {showMole > 0 &&
                (showMole < 0.96 ? (
                  <Mole
                    isShow={showMole}
                    src={moleImg}
                    alt="moleImg"
                    onClick={() => handleMoleClick()}
                  />
                ) : showMole < 0.98 ? (
                  <Mole
                    isShow={showMole}
                    src={goldMoleImg}
                    alt="moleImg"
                    onClick={() => handleMoleClick()}
                  />
                ) : (
                  <Mole
                    isShow={showMole}
                    src={blackMoleImg}
                    alt="moleImg"
                    onClick={() => handleMoleClick()}
                  />
                ))}
            </div>
          ))}
        </GameBody>
      </GameContainer>
    </Container>
  );
}

export default CatchMole;

const Container = styled.div`
  width: 80rem;
  height: 50rem;
  position: relative;
`;
const GameContainer = styled.div`
  width: 80rem;
  height: 50rem;
  background-image: url(${backGroundImg});
  background-size: cover;
  padding: 1.5rem;
  :hover {
    cursor: url(${hammer}) 15 15, url(${hammer}) 15 15, auto;
  }
  :active {
    cursor: url(${hammerDown}) 15 15, url(${hammerDown}) 15 15, auto;
  }
`;

const ReadyContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 997;
`;

const ReadyMask = styled.div`
  position: absolute;
  z-index: 998;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;

const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;

const ReadyBody = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 4rem;
    color: white;
    padding-bottom: 3rem;
    animation: ${blinkAnimation} 1s infinite;
  }
`;
const PlayButtonImg = styled.img`
  width: 15rem;
  cursor: pointer;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 2.7rem;
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
  div:last-child::before {
    margin: 0 2rem;
    content: '|';
  }
`;

const LeftTime = styled.span<{ leftTime: number }>`
  color: ${({ leftTime }) => (leftTime < 11 && leftTime > 0 ? 'red' : 'white')};
`;

const slideInAndOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(100%);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(100%);
  }
`;

const GameBody = styled.div`
  width: 70%;
  height: 84%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  row-gap: 4.7rem;
  cursor: pointer;
  div {
    display: flex;
    align-items: end;
    justify-content: center;
    overflow-y: hidden;
    /* border: 1rem solid red; */
  }
  :hover {
    cursor: url(${hammer}) 15 15, url(${hammer}) 15 15, auto;
  }
  :active {
    cursor: url(${hammerDown}) 15 15, url(${hammerDown}) 15 15, auto;
  }
`;

const Mole = styled.img<{ isShow: number }>`
  height: 8rem;
  margin-right: 1rem;
  animation: ${({ isShow }) =>
    isShow >= 0.9 &&
    css`
      ${slideInAndOut} 1.7s linear infinite
    `};
  :active {
    height: 6rem;
  }
`;
