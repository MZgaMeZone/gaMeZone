import React from 'react';
import { MainBodyProps } from '../../types/mainType';
import { FooterBar, StartButton, Clock, SubButton } from './mainStyle';

function MainFooter(props: MainBodyProps) {
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
