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

const userToken: string | null = localStorage.getItem('userToken');

function CatchMole(props: { setGameName: (name: string) => void }) {
  const navigate = useNavigate();
  const { setGameName } = props;
  const [showReady, setshowReady] = useState<boolean>(true);
  const [showMoles, setShowMoles] = useState<number[]>([]);
  const [leftTime, setLeftTime] = useState<number>(30);
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState<userDataType>({
    nickname: 'Anonymous',
  });

  useEffect(() => {
    setGameName('두더지 게임');
  });

  useEffect(() => {
    if (userToken) {
      const fetchData = async () => {
        const responseData = await get<userDataType>('/api/users');
        setUserData(responseData.data);
      };
      fetchData();
    } else {
      setUserData({
        nickname: 'Anonymous',
      });
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
      TimeDown();
    }, 1100);
  };

  const TimeDown = () => {
    setLeftTime((prevTime) => prevTime - 1);
  };

  const handleMoleClick = (moleColor: string) => {
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
                    onClick={() => handleMoleClick('brown')}
                  />
                ) : showMole < 0.98 ? (
                  <Mole
                    isShow={showMole}
                    src={goldMoleImg}
                    alt="moleImg"
                    onClick={() => handleMoleClick('gold')}
                  />
                ) : (
                  <Mole
                    isShow={showMole}
                    src={blackMoleImg}
                    alt="moleImg"
                    onClick={() => handleMoleClick('black')}
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
