import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../style/gameLayout.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import GameLoading from './gameLoading';
import GameRanking from './gameRanking';
import GameManual from './gameManual';
import TimeStopGame from '../../components/Games/StopWatch/timeStop';

import exitImg from '../../style/icons/x-solid.svg';
import gameFavicon from '../../style/icons/game_favicon.svg';
import MainBody from '../mainPage/main-body';
import MainFooter from '../mainPage/main-footer';
import { fontFamily } from '@mui/system';

const GameLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRanking, setShowRanking] = useState<Boolean>(false);
  const [showManual, setShowManual] = useState<Boolean>(false);
  const [mainModal, setMainModal] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams();

  //게임 props로 전달받은 게임 이름 설정(헤더 타이틀에 렌더링)
  const handleGameName = (name: string) => {
    setGameName(name);
  };

  useEffect(() => {
    console.log(sessionStorage[`${id}`]);
    if (!sessionStorage[`${id}`]) {
      sessionStorage.setItem(`${id}`, `${id} is in session`);
      console.log(sessionStorage[`${id}`]);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowRanking(true);
      }, 6000);
    } else {
      setShowRanking(true);
    }
  }, []);

  useEffect(() => {
    if (showManual) setShowRanking(false);
  }, [showManual]);
  useEffect(() => {
    if (showRanking) setShowManual(false);
  }, [showRanking]);

  //게임 컴포넌트 렌더링
  let gameComponent;
  switch (id) {
    case '64673c9e003fef9471f58799':
      gameComponent = <TimeStopGame setGameName={handleGameName} />;
      break;
    default:
      gameComponent = <div>Invalid Game ID</div>;
  }

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        // minHeight: '880px',
        // minWidth: '900px',
        overflow: 'hidden',
      }}
    >
      {isLoading ? (
        <GameLoading />
      ) : (
        <div className="game-body">
          <div className="game-container">
            <div className="game-container-header">
              <div className="game-container-header-title">
                <img src={gameFavicon} alt="gameFavicon" />
                <p>{gameName}</p>
              </div>
              <div
                className="exit-button"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <img src={exitImg} alt="exitImg" />
              </div>
            </div>
            <nav id="game-container-nav">
              <p
                onClick={() => {
                  setShowManual(!showManual);
                }}
              >
                게임설명
              </p>
              <p
                onClick={() => {
                  setShowRanking(!showRanking);
                }}
              >
                랭킹
              </p>
            </nav>
            <div className="game-container-body">{gameComponent}</div>
            <div className="game-container-footer">
              <Link to="/game/gameover" className="footer-box">
                게임오버(임시)
              </Link>
              <div className="footer-box"></div>
              <div className="footer-box"></div>
            </div>
          </div>
          <>
            {showRanking ? (
              <GameRanking setShowRanking={setShowRanking} gameId={id} />
            ) : showManual ? (
              <GameManual setShowManual={setShowManual} gameId={id} />
            ) : null}
          </>
        </div>
      )}
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default GameLayout;
