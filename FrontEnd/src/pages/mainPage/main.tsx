import MainFooter from './main-footer';
import MainHeader from './main-header';
import MainBody from './main-body';
import React from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import TimeStopGame from '../../components/Games/StopWatch/timeStop';
import { HitGame } from '../../types/mainType';

const Main = () => {
  const [mainModal, setMainModal] = React.useState<boolean>(false);

  // 더미데이터------------------------------------------------------------
  // 현재는 수동으로 관리함.
  const hitGameList: HitGame[] = [
    {
      name: '고마오',
      url: 'default',
      img: require('../../images/gomao.png'),
    },
    {
      name: '귀엽네',
      url: 'default',
      img: require('../../images/gomao.png'),
    },
    {
      name: '10초게임',
      url: '10seconds',
      img: require('../../images/cute.png'),
    },
    {
      name: '게임 준비중',
      url: 'default',
      img: require('../../images/gomao.png'),
    },
    {
      name: '게임 준비중',
      url: 'default',
      img: require('../../images/gomao.png'),
    },
    {
      name: '게임 준비중',
      url: 'default',
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
