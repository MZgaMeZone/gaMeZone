import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
const MainPage = () => {
  //   출력 컴포넌트
  return (
    <>
      <LeftBar>
        <HitGame>1번</HitGame>
        <HitGame>2번</HitGame>
        <HitGame>3번</HitGame>
        <HitGame>4번</HitGame>
        <HitGame>5번</HitGame>
      </LeftBar>
      <MainContainer>ㅎㅇㅎㅇ</MainContainer>
    </>
  );
};
export default MainPage;

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
  background-image: url("../../../logo.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0rem;
  width: 6.6rem;
  height: 3.5rem;
  background-color: #d9d9d9;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 90%;
`;
