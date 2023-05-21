import MainFooter from './main-footer';
import MainHeader from './main-header';
import MainBody from './main-body';
import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import TimeStopGame from '../../components/Games/StopWatch/timeStop';

const Main = () => {
  const [mainModal, setMainModal] = React.useState<boolean>(false);

  //더미데이터------------------------------------------------------------
  const hitGameList: any[] = [
    {
      name: '고마오',
      url: 'game/game1',
      img: require('../../images/gomao.png'),
    },
    {
      name: '귀엽네',
      url: 'game/game1',
      img: require('../../images/cute.png'),
    },
    {
      name: '10초게임',
      url: 'game/64673c9e003fef9471f58799',
      img: require('../../images/gomao.png'),
    },
    { name: '고고마오', url: '/main', img: require('../../images/gomao.png') },
    {
      name: '아주고맙ㅎ',
      url: 'game/game1',
      img: require('../../images/gomao.png'),
    },
  ];
  //-----------------------------------------------------------------------

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        minHeight: '880px',
        minWidth: '900px',
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
