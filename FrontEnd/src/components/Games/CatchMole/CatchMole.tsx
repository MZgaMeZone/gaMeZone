import React, { useEffect, useState } from 'react';
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

  const updateScore = (moleColor: string) => {
    if (moleColor === 'brown') {
      setScore((prevScore) => prevScore + 10);
    } else if (moleColor === 'gold') {
      setScore((prevScore) => prevScore + 30);
    } else if (moleColor === 'black') {
      if (score < 30) {
        setScore(0);
      } else {
        setScore((prevScore) => prevScore - 30);
      }
    }
  };

  const throttledClickHandler = (moleColor: string, moleId: number) => {
    if (throttle && throttlingMoleId === moleId) {
      return;
    }
    setThrottle(true);
    setThrottlingMoleId(moleId);
    updateScore(moleColor);

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
            <div key={'mole' + index}>
              {showMole > 0 &&
                (showMole < 0.96 ? (
                  <Mole
                    isShow={showMole}
                    src={moleImg}
                    alt="moleImg"
                    onClick={() => throttledClickHandler('brown', showMole)}
                  />
                ) : showMole < 0.98 ? (
                  <Mole
                    isShow={showMole}
                    src={goldMoleImg}
                    alt="moleImg"
                    onClick={() => throttledClickHandler('gold', showMole)}
                  />
                ) : (
                  <Mole
                    isShow={showMole}
                    src={blackMoleImg}
                    alt="moleImg"
                    onClick={() => throttledClickHandler('black', showMole)}
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
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
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
`;
