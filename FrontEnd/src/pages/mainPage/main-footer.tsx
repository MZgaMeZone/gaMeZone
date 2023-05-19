import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

function MainFooter(props: any) {
  const mainModal = props.mainModal;
  const setMainModal = props.setMainModal;
  const [timer, setTimer] = React.useState('');

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
        <SubButton to="/login">로그인</SubButton>
        <SubButton to="/ranking">랭킹</SubButton>
        <SubButton to="/community">커뮤니티</SubButton>
        <Clock>{timer}</Clock>
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
  height: 5rem;
  position: sticky;
  bottom: 0;
  z-index: 2;
  background: #c0c0c0;
  border-top: #e0e0e0 solid 2px;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
`;

const StartButton = styled.button`
  // margin-left: 1rem;
  // margin-right: 1.5rem;
  // font-size: 2rem;
  // border-radius: 0;
  // border: 1px none;
  // padding: 0.3rem 0.3rem;
  // box-shadow: 1px 1px 1px rgb(55, 55, 55);
  margin: 0.3rem 0 0 0.6rem;
  width: 14.6rem;
  height: 3.8rem;
  background: #c0c0c0;
  border: #e0e0e0 solid 2px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  text-align: center;
  color: #242424;
  font-size: 2.8rem;
  padding-top: 0.6rem;
  &:active {
    background-color: #d9d9d9;
    border: #e0e0e0 solid 2px;
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

const SubButton = styled(Link)`
  margin: 1rem;
  border-radius: 0;
  font-size: 3rem;
  border: 1px none;
  width: 25rem;
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

const Clock = styled.div`
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  font-size: 2rem;
  margin-left: auto;
  margin-right: 2rem;
  padding: 0.5rem;
  width: 12rem;
  height: 3.8rem;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5);
  background-color: #e9e9e9;
`;
