import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import backGroundImg from '../../../style/images/CatchMoleBackground.svg';
import moleImg from '../../../style/images/mole.svg';
import playButton from '../../../style/icons/play_button.svg';
import hammer from '../../../style/icons/hammer.svg';

function CatchMole(props: { setGameName: (name: string) => void }) {
  const { setGameName } = props;
  const [showReady, setshowReady] = useState<boolean>(true);
  const [showMoles, setShowMoles] = useState<boolean[]>([]);
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
      let BooleanArray: boolean[] = [];
      for (let i = 0; i < 9; i++) {
        let randomValue = Math.random();
        if (randomValue < 0.9) {
          BooleanArray.push(false);
        } else {
          BooleanArray.push(true);
        }
      }
      setShowMoles(BooleanArray);
      TimeDown();
    }, 1000);
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
    console.log(score);
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
              {showMole && (
                <img
                  src={moleImg}
                  alt="moleImg"
                  onClick={() => handleMoleClick()}
                />
              )}
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
const GameBody = styled.div`
  width: 70%;
  height: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  row-gap: 1.5rem;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 8rem;
      margin-right: 1rem;
    }
  }
`;
