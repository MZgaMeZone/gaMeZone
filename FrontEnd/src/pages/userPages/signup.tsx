import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import ContainerHeader from '../../components/Common/ContainerHeader';
import {
  ButtonNormalSmall,
  ButtonDashedSmall,
} from '../../components/Common/ButtonSmall';
import smileIcon from '../../style/icons/smile.svg';

const url = process.env.REACT_APP_API_URL;

function Signup() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState(false);
  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState(false);
  const [mainModal, setMainModal] = useState(false);

  const navigate = useNavigate();

  async function handleEmailDuplicateCheck(e: { preventDefault: () => void }) {
    e.preventDefault();

    await axios
      .post(url + '/api/users/signup/emailDuplicateCheck', {
        email: email,
      })
      .then((res) => {
        if (res.data.success) {
          setEmailDuplicateCheck(true);
          alert('사용 가능한 email입니다.');
        } else {
          setEmail('');
          alert('중복된 email입니다. 다른 email을 입력해주세요.');
        }
      });
  }

  async function handleNicknameDuplicateCheck(e: {
    preventDefault: () => void;
  }) {
    e.preventDefault();

    await axios
      .post(url + '/api/users/signup/nicknameDuplicateCheck', {
        nickname: nickname,
      })
      .then((res) => {
        if (res.data.success) {
          setNicknameDuplicateCheck(true);
          alert('사용 가능한 nickname입니다.');
        } else {
          setNickname('');
          alert('중복된 nickname입니다. 다른 nickname을 입력해주세요.');
        }
      });
  }

  const handleSubmitCheck = () => {
    if (!emailDuplicateCheck) alert('이메일 중복 확인을 해주세요.');
    else if (!nicknameDuplicateCheck) alert('닉네임 중복 확인을 해주세요.');
    else if (!(password === passwordCheck))
      alert('비밀번호 일치 여부를 확인해주세요.');
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await axios
      .post(url + '/api/users/signup', {
        email: email,
        nickname: nickname,
        password: password,
      })
      .then((res) => {
        if (res.status === 201) {
          alert(`회원가입이 완료되었습니다. 환영합니다 ${nickname}님!`);
          navigate('/login');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
      <SingupSection>
        <SingupContainer>
          <ContainerHeader
            favicon={smileIcon}
            title="회원가입"
            onClick={() => navigate(-1)}
          />
          <SignupForm onSubmit={handleSubmit}>
            <SignupField>
              <p>Email</p>
              <InputContainer>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={emailDuplicateCheck}
                  placeholder="email@email.com"
                />
              </InputContainer>
              {email === '' ? (
                <ButtonNormalSmall text="중복확인" disabled />
              ) : (
                <ButtonNormalSmall
                  text="중복확인"
                  onClick={handleEmailDuplicateCheck}
                />
              )}
            </SignupField>
            <ErrorMessageContainer>
              <ErrorMessageContainer>
                {email &&
                !email.match(
                  /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                ) ? (
                  <p>올바른 이메일 형식을 입력하세요.</p>
                ) : (
                  ''
                )}
              </ErrorMessageContainer>
            </ErrorMessageContainer>
            <SignupField>
              <p>Nickname</p>
              <InputContainer>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  disabled={nicknameDuplicateCheck}
                  placeholder="nickname"
                />
              </InputContainer>
              {nickname === '' ? (
                <ButtonNormalSmall text="중복확인" disabled />
              ) : (
                <ButtonNormalSmall
                  text="중복확인"
                  onClick={handleNicknameDuplicateCheck}
                />
              )}
            </SignupField>
            <ErrorMessageContainer>
              {nickname
                ? (nickname.length < 2 || nickname.length > 10) && (
                    <p>닉네임을 2자리 이상 10자리 이하로 입력해주세요.</p>
                  )
                : ''}
            </ErrorMessageContainer>
            <SignupField>
              <p>Password</p>
              <InputContainer>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </InputContainer>
            </SignupField>
            <ErrorMessageContainer>
              {password
                ? password.length < 8 && (
                    <p>비밀번호를 8자리 이상 입력해주세요.</p>
                  )
                : ''}
            </ErrorMessageContainer>
            <SignupField>
              <p>
                Check
                <br />
                Password
              </p>
              <InputContainer>
                <input
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  placeholder="password"
                />
              </InputContainer>
            </SignupField>
            <ErrorMessageContainer>
              {passwordCheck && password !== passwordCheck && (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}
            </ErrorMessageContainer>
            <ContainerFooter>
              <div onClick={handleSubmitCheck}>
                <ButtonDashedSmall
                  text="가입하기"
                  type="submit"
                  disabled={
                    !emailDuplicateCheck ||
                    !nicknameDuplicateCheck ||
                    !(password === passwordCheck)
                  }
                />
              </div>
            </ContainerFooter>
          </SignupForm>
        </SingupContainer>
      </SingupSection>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
}
export default Signup;

const SingupSection = styled.div`
  background-color: var(--background--gray);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background--gray);
  border: 1px solid #000000;
  box-shadow: 3px 3px 4px #1c1c1c;
  width: 85rem;
  height: 51rem;
  overflow: auto;
`;

const SingupContainer = styled.div`
  background-color: var(--background--gray);
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 3rem 6rem;
`;

const SignupField = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.6fr 0.5fr;
  font-size: 2.6rem;
  margin: 1.5rem 0;
  p {
    display: flex;
    align-items: center;
  }
`;

const InputContainer = styled.div`
  background: white;
  position: relative;
  box-sizing: border-box;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(132, 133, 132) rgb(254, 254, 254) rgb(254, 254, 254)
    rgb(132, 133, 132);
  margin-right: 3rem;
  input {
    height: 4.3rem;
    width: 100%;
    font-size: 2.7rem;
    padding-left: 2rem;
    border: none;
    box-shadow: inset 0.2rem 0.2rem 0.2rem 0rem #000000,
      0.2rem 0.2rem 0.2rem 0rem #e0e0e0;
  }
  :before {
    position: absolute;
    left: 0px;
    top: 0px;
    content: '';
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-style: solid;
    border-width: 2px;
    border-color: rgb(10, 10, 10) rgb(223, 223, 223) rgb(223, 223, 223)
      rgb(10, 10, 10);
    pointer-events: none;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px inset;
  }
`;

const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  line-height: 0.2rem;
  color: red;
`;

const ContainerFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
