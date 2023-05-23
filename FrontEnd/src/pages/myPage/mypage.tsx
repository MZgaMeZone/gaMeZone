import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../style/reset.css';
import '../../style/mypage.css';
import img from './img-1682667302883.png';
import axios from 'axios';

import Footer from '../mainPage/main-footer';
import Container from './components/container';
import Profile from './components/profile';
import UserInfo from './components/userInfo';
import UserCommu from './components/userCommu';
import MainBody from '../mainPage/main-body';
import MainFooter from '../mainPage/main-footer';
import MainHeader from '../mainPage/main-header';

// const user = { id: 'flsgp123', nick: '내닉네임은너무나도길어' };

const url = process.env.REACT_APP_API_URL;
const userToken: string | null = localStorage.getItem('userToken');
const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

function MyPage() {
  const [mainModal, setMainModal] = React.useState<boolean>(false);
  const [nickName, setNickName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/');
    }

    const getUserInfo = async () => {
      const { data } = await axios.get(url + '/api/users', config);
      setNickName(data.nickname);
      setEmail(data.email);
    };
    getUserInfo();
  }, []);

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
      <Container>
        <Profile img={img} email={email} nickName={nickName} />
        <Content>
          <UserInfo />
          <UserCommu />
        </Content>
      </Container>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 90%;
  height: 85%;
  border-radius: 5px;
`;

export default MyPage;
