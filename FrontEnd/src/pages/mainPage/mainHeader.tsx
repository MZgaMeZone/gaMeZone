import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tracker from '../../components/Tools/countingToday';
import { HitGame, MainHeaderProps } from '../../types/mainType';
import { HitGameBox, HitGameButton, GameImage } from './mainStyle';

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
