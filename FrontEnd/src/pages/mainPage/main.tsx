import MainFooter from './mainFooter';
import MainHeader from './mainHeader';
import MainBody from './mainBody';
import React from 'react';
import { HitGame } from '../../types/mainType';

const Main = () => {
  const [mainModal, setMainModal] = React.useState<boolean>(false);

  // 더미데이터------------------------------------------------------------
  // 현재는 수동으로 관리함.
  const hitGameList: HitGame[] = [
    {
      name: '두더지 잡기',
      url: 'CatchMole',
      img: require('../../style/icons/gameIcons/catchingAMoleGame.png'),
    },
    {
      name: '10초게임',
      url: '10seconds',
      img: require('../../style/icons/gameIcons/10SecondsGame.png'),
    },
    {
      name: '행맨',
      url: 'hangman',
      img: require('../../style/icons/gameIcons/hangman.png'),
    },
    {
      name: '애니콜 폭탄게임',
      url: 'default',
      img: require('../../style/icons/gameIcons/bombGame.png'),
    },
    {
      name: '벽돌 부수기',
      url: 'default',
      img: require('../../style/icons/gameIcons/brickGame.png'),
    },
  ];
  //-----------------------------------------------------------------------

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        // minHeight: '880px',
        // minWidth: '900px',
        overflow: 'hidden',
      }}
    >
      <MainHeader hitGameList={hitGameList}></MainHeader>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default Main;
