import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
const Main = () => {
  // 현재 시간을 출력하는 함수
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

  // 출력 컴포넌트
  return (
    <div
      style={{
        backgroundColor: "#008080",
        height: "97vh",
        width: "100vw",
        minHeight: "480px",
        minWidth: "640px",
      }}
    >
      <LeftBar>
        <HitGame>
          <img />
          1번
        </HitGame>
        <HitGame>2번</HitGame>
        <HitGame>3번</HitGame>
        <HitGame>4번</HitGame>
        <HitGame>5번</HitGame>
      </LeftBar>
      <MainContainer>빈칸</MainContainer>
      <FooterBar>
        <StartButton>카테고리</StartButton>
        <SubButton>로그인</SubButton>
        <SubButton>랭킹</SubButton>
        <SubButton>커뮤니티</SubButton>
        <Clock>{timer}</Clock>
      </FooterBar>
    </div>
  );
};
export default Main;

const LeftBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  float: left;
  width: 10%;
`;
const HitGame = styled.div`
  display: flex;
  margin: 2rem 2rem;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0rem;
  width: 6.6rem;
  height: 3.5rem;
  background-color: #d9d9d9;
`;

const FooterBar = styled.div`
  background-color: #c0c0c0;
  display: flex;
  margin-bottom: auto;
  align-items: center;
  height: 2.3rem;
  position: sticky;
  bottom: 0;
  z-index: 2;
`;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  width: 90%;
`;

const StartButton = styled.button`
  margin-left: 0.4rem;
  margin-right: 1rem;
  font-size: 1rem;
  border-radius: 0;
  border: 1px none;
  padding: 0.3rem 0.3rem;
  box-shadow: 1px 1px 1px rgb(55, 55, 55);
`;

const SubButton = styled.button`
  margin: 0.4rem;
  border-radius: 0;
  font-size: 1rem;
  border: 1px none;
  width: 12rem;
  height: 1.6rem;
  box-shadow: 1px 1px 1px rgb(55, 55, 55);
`;

const Clock = styled.div`
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 1.8rem;
  margin-left: auto;
  margin-right: 2rem;
  padding: 0.22rem;
  height: 1.6rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #e9e9e9;
`;
