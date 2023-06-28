import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../style/gameLayout.css';
import { useParams } from 'react-router-dom';
import GameLoading from '../../components/Games/GameLoading';
import GameRanking from '../../components/Games/gameRanking';
import GameManual from '../../components/Games/GameManual';
import TimeStopGame from '../../components/Games/StopWatch/timeStop';
import DefaultPage from '../../components/Games/defaultPage';
import axios from 'axios';
import gameFavicon from '../../style/icons/game_favicon.svg';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import ContainerHeader from '../../components/Common/ContainerHeader';
import { fontFamily } from '@mui/system';

const GameLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRanking, setShowRanking] = useState<Boolean>(false);
  const [showManual, setShowManual] = useState<Boolean>(false);
  const [mainModal, setMainModal] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string | null>('');
  const [userRole, setUserRole] = useState<string | null>('');

  const { id } = useParams();

  //게임 props로 전달받은 게임 이름 설정(헤더 타이틀에 렌더링)
  const handleGameName = (name: string) => {
    setGameName(name);
  };

  useEffect(() => {
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
    case '10seconds':
      gameComponent = <TimeStopGame setGameName={handleGameName} />;
      break;
    default:
      gameComponent = (
        <DefaultPage setGameName={handleGameName}>Invalid Game ID</DefaultPage>
      );
  }
  // 닉네임과 게임명을 얻어오고 싶음.
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    // 토큰을 이용하여 유저 정보를 얻어오는 함수 호출
    fetchUserInfo(token);
  }, []);
  const fetchUserInfo = (token: string | null) => {
    // 서버로 토큰을 전송하여 유저 정보를 요청하는 API 호출
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserNickname(res.data.nickname);
          setUserRole(res.data.role);
        })
        .catch((error) => {
          // 에러 처리
          console.error(error);
        });
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {isLoading ? (
        <GameLoading />
      ) : (
        <div className="game-body">
          <div className="game-container">
            <ContainerHeader favicon={gameFavicon} title={gameName} />
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
              <div className="footer-box box1">
                {userRole ? userRole : 'guest'}
              </div>
              <div className="footer-box box2">
                {userNickname ? userNickname : ''}
              </div>
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
