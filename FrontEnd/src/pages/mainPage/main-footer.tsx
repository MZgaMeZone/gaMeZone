import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
const MainFooter = () => {
  //   현재 시간을 출력하는 함수
  const [timer, setTimer] = React.useState("");
  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const dayOrNight = hours > 12 ? "PM" : "AM";
      hours = dayOrNight === "PM" ? hours - 12 : hours;
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
    <FooterBar>
      <StartButton
        onClick={() => {
          alert("ㅎㅇ");
        }}
      >
        카테고리
      </StartButton>
      <SubButton>로그인</SubButton>
      <SubButton>랭킹</SubButton>
      <SubButton>커뮤니티</SubButton>
      <Clock>{timer}</Clock>
    </FooterBar>
  );
};
export default MainFooter;

const FooterBar = styled.div`
  background-color: #c0c0c0;
  display: flex;
  margin-bottom: auto;
  align-items: center;
  height: 4rem;
  position: sticky;
  bottom: 0;
  z-index: 2;
`;

const StartButton = styled.button`
  margin-left: 1rem;
  margin-right: 1.5rem;
  font-size: 2rem;
  border-radius: 0;
  border: 1px none;
  padding: 0.3rem 0.3rem;
  box-shadow: 1px 1px 1px rgb(55, 55, 55);
`;

const SubButton = styled.button`
  margin: 0.4rem;
  border-radius: 0;
  font-size: 2rem;
  border: 1px none;
  width: 25rem;
  height: 2.5rem;
  box-shadow: 1px 1px 1px rgb(55, 55, 55);
`;

const Clock = styled.div`
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3.5rem;
  font-size: 2rem;
  margin-left: auto;
  margin-right: 2rem;
  padding: 0.5rem;
  height: 2rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #e9e9e9;
`;
