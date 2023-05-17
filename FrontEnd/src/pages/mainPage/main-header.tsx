import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const hitGameList = [
  {
    name: "고마오",
    url: "/main",
    img: require("../../images/gomao.png"),
  },
  {
    name: "귀엽네",
    url: "/main",
    img: require("../../images/cute.png"),
  },
  {
    name: "10초게임",
    url: "/game1",
    img: require("../../images/gomao.png"),
  },
  { name: "고고마오", url: "/main", img: require("../../images/gomao.png") },
  { name: "아주고맙ㅎ", url: "/main", img: require("../../images/gomao.png") },
];

const MainHeader = () => {
  return (
    <>
      <HitGameBox>
        <ul>
          {hitGameList &&
            hitGameList.map((item, index) => (
              <HitGame key={index}>
                <GameImage src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </HitGame>
            ))}
        </ul>
      </HitGameBox>
    </>
  );
};
export default MainHeader;

const HitGameBox = styled.div`
  display: flex;
  float: right;
  margin-top: 6rem;
  margin-right: 2rem;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;
const HitGame = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1rem;
  justify-content: center;
  padding: 1rem 1.5rem;
  width: 130px;
  height: 130px;
`;
const GameImage = styled.img`
  width: 100%;
  height: auto;
`;
