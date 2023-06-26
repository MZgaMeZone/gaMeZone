import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Tracker from '../../components/Tools/countingToday';
import { HitGame, MainHeaderProps } from '../../types/mainType';

const MainHeader: React.FC<MainHeaderProps> = ({ hitGameList }) => {
  const navigate = useNavigate();
  function handleGameClick(itemId: string) {
    navigate(`/game/${itemId}`);
  }

  return (
    <>
      <HitGameBox>
        <ul>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: 'yellow',
            }}
          ></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: 'yellow',
            }}
          >
            <div>Top5 Games</div>
          </div>
          {hitGameList &&
            //hitGame은 최대 5개까지 출력함.
            hitGameList.slice(0, 5).map((item: HitGame, index: number) => (
              <HitGameButton
                key={index}
                onClick={() => handleGameClick(item.url)}
              >
                <GameImage src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </HitGameButton>
            ))}
        </ul>
      </HitGameBox>
    </>
  );
};

export default MainHeader;

const HitGameBox = styled.div`
  display: flex;
  position: fixed;
  top: 45px;
  justify-content: flex-end;
  // background-color: beige;
  // margin-top: 7rem;
  margin-right: 2rem;
  // align-items: center;
  width: fit-content;
  height: 600px;
`;
const HitGameButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1rem;
  justify-content: center;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 20px;
  width: 15rem;
  height: 15rem;
`;
const GameImage = styled.img`
  width: 100%;
  height: auto;
  // overflow: hidden;
`;
