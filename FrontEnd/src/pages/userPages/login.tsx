import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Users/LoginForm';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

function Login() {
  const [mainModal, setMainModal] = useState(false);
  const navigate = useNavigate();

  function handleLogin(email: string, password: string) {
    if (email === '' || password === '') {
      return alert('이메일과 비밀번호 모두 입력해주세요.');
    }
    axios
      .post(url + '/api/users/login', {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          localStorage.setItem('userToken', res.data.userToken);
          navigate('/');
          window.location.reload();
        }
      })
      .catch((e) => {
        alert('올바른 이메일과 비밀번호를 입력하세요.');
      });
  }

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <LoginForm onLogin={handleLogin} onSignup={() => navigate('/signup')} />
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
}

export default Login;
