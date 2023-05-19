import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

interface HitGame {
  name: string;
  url: string;
  img: string;
}

interface MainHeaderProps {
  hitGameList: HitGame[];
}

const MainHeader: React.FC<MainHeaderProps> = ({ hitGameList }) => {
  const navigate = useNavigate();
  function handleGameClick(itemId: string) {
    navigate(`/game/${itemId}`);
  }

  return (
    <>
      <HitGameBox>
        <ul>
          {hitGameList &&
            hitGameList.map((item: HitGame, index: number) => (
              <HitGame key={index} onClick={() => handleGameClick(item.url)}>
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
