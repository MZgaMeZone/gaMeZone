import React from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

function MainFooter(props: any) {
  const mainModal = props.mainModal;
  const setMainModal = props.setMainModal;
  const [timer, setTimer] = React.useState('');
  const [hide, setHide] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function handleLogout() {
    localStorage.removeItem('userToken');
    console.log('Logout 실행');
    console.log('userToken 삭제');
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
  }

  React.useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      // console.log('userToken를 정상적으로 받아왔습니다!'); // 현재 정상 동작하는 기능으로 주석 처리함
      setIsLoggedIn(true);
    }
  }, []);

  //   현재 시간을 출력하는 함수
  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const dayOrNight = hours >= 12 ? 'PM' : 'AM';
      hours = dayOrNight === 'PM' ? (hours === 12 ? 12 : hours % 12) : hours;
      setTimer(
        `${dayOrNight} ${hours}:${minutes < 10 ? `0${minutes}` : minutes}`
      );
    };
    const interval = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  //   출력 컴포넌트
  return (
    <>
      <FooterBar>
        <StartButton
          onClick={() => {
            setMainModal(!mainModal);
          }}
        >
          카테고리
        </StartButton>
        <SubButton to="/">Home</SubButton>
        <SubButton to="/ranking">Ranking</SubButton>
        <SubButton to="/community">Community</SubButton>
        {isLoggedIn ? (
          <>
            <SubButton to="/login" onClick={handleLogout}>
              Logout
            </SubButton>
            <SubButton to="/mypage">MyPage</SubButton>
          </>
        ) : (
          <SubButton to="/login">Login</SubButton>
        )}

        {hide > 5 && (
          <>
            <SubButton to="/admin">AdminPage</SubButton>
          </>
        )}
        <Clock>
          <button
            style={{ cursor: 'default', color: 'rgb(232,232,232)' }}
            onClick={() => {
              setHide(hide + 1);
            }}
          >
            _
          </button>
          {timer}
          <button
            style={{ cursor: 'default', color: 'rgb(232,232,232)' }}
            onClick={() => {
              setHide(0);
            }}
          >
            _
          </button>
        </Clock>
      </FooterBar>
    </>
  );
}
export default MainFooter;

const FooterBar = styled.div`
  background-color: #c0c0c0;
  display: flex;
  position: absolute;
  align-items: center;
  white-space: nowrap;
  height: 5rem;
  position: sticky;
  bottom: 0;
  z-index: 2;
  background: #c0c0c0;
  border-top: #e0e0e0 solid 2px;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
`;

const StartButton = styled.button`
  margin: 0.3rem 1rem 0.3rem 0.6rem;
  width: 18rem;
  height: 3.8rem;
  background: #c0c0c0;
  border: #e0e0e0 solid 2px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  text-align: center;
  color: #242424;
  font-size: 2.5rem;
  padding-top: 0.6rem;
  &:active {
    background-color: #d9d9d9;
    border: #e0e0e0 solid 2px;
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

const Clock = styled.div`
  height: 3.5rem;
  font-size: 2.6rem;
  margin-left: auto;
  margin-right: 0.4rem;
  text-align: center;
  padding: 1rem 1rem 0 1rem;
  white-space: nowrap;
  width: fit-content;
  height: 3.8rem;
  box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.6);
  border: #e0e0e0 solid 2px;
  background: #d9d9d9;
  color: #242424;
  background-color: #e9e9e9;
`;

const SubButton = styled(Link)`
  margin: 0.4rem;
  border-radius: 0;
  font-size: 3rem;
  border: 1px none;
  width: 20rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9e9e9;
  box-shadow: 1px 1px 1px rgb(55, 55, 55);
  &:active {
    background-color: #d9d9d9;
    border: #e0e0e0 solid 2px;
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;
