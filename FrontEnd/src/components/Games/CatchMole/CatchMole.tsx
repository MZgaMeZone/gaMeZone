import React, { useEffect, useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { get } from '../../../api/api';
import CatchMoleRecorder from './CatchMoleRecorder';
import backGroundImg from '../../../style/images/CatchMoleBackground.svg';
import moleImg from '../../../style/images/mole.svg';
import blackMoleImg from '../../../style/images/blackMole.svg';
import goldMoleImg from '../../../style/images/goldMole.svg';
import playButton from '../../../style/icons/play_button.svg';
import hammer from '../../../style/icons/hammer.svg';
import hammerDown from '../../../style/icons/hammer_down.svg';
import { useNavigate } from 'react-router-dom';

interface userDataType {
  email?: string;
  nickname: string;
}

function CatchMole(props: { setGameName: (name: string) => void }) {
  const navigate = useNavigate();
  const { setGameName } = props;
  const userToken: string | null = localStorage.getItem('userToken');
  const [showReady, setshowReady] = useState<boolean>(true);
  const [showMoles, setShowMoles] = useState<number[]>([]);
  const initialMoleScore = Array(9).fill(0);
  const [moleScore, setMoleScore] = useState<number[]>(initialMoleScore);
  const isDoubleProcessing = useRef(false);
  const [leftTime, setLeftTime] = useState<number>(30);
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState<userDataType>({
    nickname: 'Anonymous',
  });
  const [throttle, setThrottle] = useState(false);
  const [throttlingMoleId, setThrottlingMoleId] = useState(-1);

  useEffect(() => {
    setGameName('두더지 잡기');
  });

  useEffect(() => {
    if (!userToken) {
      setUserData({
        nickname: 'Anonymous',
      });
    } else {
      const fetchData = async () => {
        const responseData = await get<userDataType>('/api/users');
        setUserData(responseData.data);
      };
      fetchData();
    }
  }, []);

  const handlePlayButton = () => {
    setshowReady(false);
    handleShowMoles();
  };

  let moleInterval: NodeJS.Timer;
  const handleShowMoles = () => {
    moleInterval = setInterval(() => {
      let showMoleArray: number[] = [];
      for (let i = 0; i < 9; i++) {
        let randomValue = Math.random();
        if (randomValue < 0.9) {
          showMoleArray.push(0);
        } else {
          showMoleArray.push(randomValue);
        }
      }
      setShowMoles(showMoleArray);
      timeDown();
    }, 1100);
  };

  const timeDown = () => {
    setLeftTime((prevTime) => prevTime - 1);
  };

  const showSelectedMoleScore = (score: number, moleLocation: number) => {
    if (moleScore[moleLocation] !== 0) {
      isDoubleProcessing.current = true;
    }
    setMoleScore((prev) => {
      const newMoleScoreArray = [...prev];
      newMoleScoreArray[moleLocation] = score;
      return newMoleScoreArray;
    });

    setTimeout(() => {
      if (isDoubleProcessing.current) {
        isDoubleProcessing.current = false; // useRef로 참조한 변수는 .current를 통해 현재 값을 변경할 수 있음
        return;
      } else {
        setMoleScore((prev) => {
          const newMoleScoreArray = [...prev];
          newMoleScoreArray[moleLocation] = 0;
          return newMoleScoreArray;
        });
      }
    }, 1000);
  };

  const updateScore = (moleColor: string, moleLocation: number) => {
    if (moleColor === 'brown') {
      setScore((prevScore) => prevScore + 10);
      showSelectedMoleScore(10, moleLocation);
    } else if (moleColor === 'gold') {
      setScore((prevScore) => prevScore + 30);
      showSelectedMoleScore(30, moleLocation);
    } else if (moleColor === 'black') {
      showSelectedMoleScore(-30, moleLocation);
      if (score < 30) {
        setScore(0);
      } else {
        setScore((prevScore) => prevScore - 30);
      }
    }
  };

  const throttledClickHandler = (
    moleColor: string,
    moleId: number,
    moleLocation: number
  ) => {
    if (throttle && throttlingMoleId === moleId) {
      return;
    }

    setThrottle(true);
    setThrottlingMoleId(moleId);
    updateScore(moleColor, moleLocation);

    setTimeout(() => {
      setThrottle(false);
      setThrottlingMoleId(-1);
    }, 1000);
  };

  useEffect(() => {
    if (leftTime === 0) {
      clearInterval(moleInterval);
      setShowMoles([]);
      CatchMoleRecorder(navigate, score, userData);
    }
  }, [leftTime]);

  return (
    <Container>
      {showReady && (
        <ReadyContainer>
          <ReadyMask></ReadyMask>
          <ReadyBody>
            <h2>PRESS PLAY</h2>
            <PlayButtonImg
              src={playButton}
              alt="플레이버튼"
              onClick={() => handlePlayButton()}
            />
            <p>상단 [게임설명]을 확인해보세요!</p>
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
            <MoleContainer key={'mole' + index}>
              {moleScore[index] !== 0 && (
                <MoleScore
                  score={moleScore[index]}
                  isDouble={isDoubleProcessing.current}
                >
                  {moleScore[index] > 0
                    ? `+${moleScore[index]}`
                    : moleScore[index]}
                </MoleScore>
              )}
              {showMole > 0 &&
                (showMole < 0.96 ? (
                  <Mole
                    isShow={showMole}
                    src={moleImg}
                    alt="moleImg"
                    onClick={(e) =>
                      throttledClickHandler('brown', showMole, index)
                    }
                  />
                ) : showMole < 0.98 ? (
                  <Mole
                    isShow={showMole}
                    src={goldMoleImg}
                    alt="moleImg"
                    onClick={(e) =>
                      throttledClickHandler('gold', showMole, index)
                    }
                  />
                ) : (
                  <Mole
                    isShow={showMole}
                    src={blackMoleImg}
                    alt="moleImg"
                    onClick={(e) =>
                      throttledClickHandler('black', showMole, index)
                    }
                  />
                ))}
            </MoleContainer>
          ))}
        </GameBody>
      </GameContainer>
    </Container>
  );
}

export default CatchMole;

const PreventDragImg = css`
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

const PreventSelect = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const Container = styled.div`
  width: 80rem;
  height: 50rem;
  position: relative;
  ${PreventSelect}
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
  color: white;
  h2 {
    font-size: 4rem;
    font-weight: normal;
    margin-top: 0;
    animation: ${blinkAnimation} 1s infinite;
  }
  p {
    font-size: 2rem;
    position: absolute;
    bottom: 2rem;
    right: 50;
    left: 50;
    text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
  }
`;

const PlayButtonImg = styled.img`
  width: 15rem;
  cursor: pointer;
  ${PreventDragImg}
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
  height: 84.5%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  row-gap: 4.5rem;
  cursor: pointer;
  div {
    display: flex;
    align-items: end;
    justify-content: center;
    overflow-y: hidden;
  }
  :hover {
    cursor: url(${hammer}) 15 15, url(${hammer}) 15 15, auto;
  }
  :active {
    cursor: url(${hammerDown}) 15 15, url(${hammerDown}) 15 15, auto;
  }
`;

const MoleContainer = styled.div`
  position: relative;
`;

const Mole = styled.img<{ isShow: number }>`
  height: 8rem;
  margin-right: 1rem;
  animation: ${({ isShow }) =>
    isShow >= 0.9 &&
    css`
      ${slideInAndOut} 1.1s linear infinite
    `};
  :active {
    height: 6rem;
  }
  ${PreventSelect}
  ${PreventDragImg}
  z-index: 995;
`;

const showMoleScoreAnimation = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const MoleScore = styled.div<{ score: number; isDouble: boolean }>`
  position: absolute;
  font-size: 3rem;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  color: ${({ score }) =>
    score === 30 ? 'yellow' : score === 10 ? 'orange' : '#b4b4b4'};
  top: 0;
  left: 35%;
  transform: translateX(-65%);
  z-index: 996;
  animation: ${showMoleScoreAnimation}
    ${({ isDouble }) => (isDouble ? '2s' : '1s')} forwards;
`;
