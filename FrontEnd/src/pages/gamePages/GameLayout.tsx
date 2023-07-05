import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { get } from '../../api/api';
import UserDataType from '../../types/userType';
import GameLoading from '../../components/Games/GameLoading';
import GameRanking from '../../components/Games/GameRanking';
import GameManual from '../../components/Games/GameManual';
import TimeStopGame from '../../components/Games/StopWatch/timeStop';
import DefaultPage from '../../components/Games/defaultPage';
import gameFavicon from '../../style/icons/game_favicon.svg';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import ContainerHeader from '../../components/Common/ContainerHeader';

const GameLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRanking, setShowRanking] = useState<Boolean>(false);
  const [showManual, setShowManual] = useState<Boolean>(false);
  const [mainModal, setMainModal] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string | null>('');
  const [userRole, setUserRole] = useState<string | null>('');
  const navigate = useNavigate();
  const { id } = useParams();

  //게임 props로 전달받은 게임 이름 설정(헤더 타이틀에 렌더링)
  const handleGameName = (name: string) => {
    setGameName(name);
  };

  useEffect(() => {
    if (!sessionStorage[`${id}`]) {
      sessionStorage.setItem(`${id}`, `${id} is in session`);
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
    if (token) {
      const fetchData = async () => {
        const responseData = await get<UserDataType>(`/api/users`);
        setUserNickname(responseData.data.nickname);
        setUserRole(responseData.data.role);
      };
      fetchData();
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
        <GameBody>
          <GameContainer>
            <ContainerHeader
              favicon={gameFavicon}
              title={gameName}
              onClick={() => navigate(-1)}
            />
            <GameContainerNav>
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
            </GameContainerNav>
            <GameContainerBody>{gameComponent}</GameContainerBody>
            <GameContainerFooter>
              <FooterBox long={false}>
                {userRole ? userRole : 'guest'}
              </FooterBox>
              <FooterBox long>{userNickname ? userNickname : ''}</FooterBox>
            </GameContainerFooter>
          </GameContainer>
          <>
            {showRanking ? (
              <GameRanking setShowRanking={setShowRanking} gameId={id} />
            ) : showManual ? (
              <GameManual setShowManual={setShowManual} gameId={id} />
            ) : null}
          </>
        </GameBody>
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

const GameBody = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'neodgm', cursive;
  display: flex;
  justify-content: center;
`;

const GameContainer = styled.div`
  margin: 10rem auto auto auto;
  background: #c0c0c0;
  border: 1px solid #000000;
  box-shadow: 3px 3px 4px #1c1c1c;
  font-size: 2.5rem;
  display: inline-block;
`;

const GameContainerNav = styled.nav`
  display: flex;
  padding: 0 2rem;
  height: 4.5rem;
  border-bottom: #7e7e7e 0.2rem solid;
  p {
    cursor: pointer;
    font-size: 2.3rem;
    padding: 1rem;
    margin: 0;
    :hover {
      background-color: rgb(222, 222, 222);
    }
  }
`;

const GameContainerBody = styled.div`
  padding: 1rem;
`;
const GameContainerFooter = styled.div`
  width: 99%;
  height: 4rem;
  margin: 0.7rem auto;
  display: flex;
  justify-content: space-evenly;
`;

const FooterBox = styled.div<{ long: boolean }>`
  flex-basis: ${({ long }) => (long ? '60%' : '30%')};
  box-shadow: inset -3px -3px 3px rgba(255, 255, 255, 0.8),
    inset 3px 3px 3px rgba(0, 0, 0, 0.32);
  padding: 0.6rem 0.6rem;
  display: flex;
  justify-content: center;
`;
