import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MainBody from '../mainPage/main-body';
import MainFooter from '../mainPage/main-footer';

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
    console.log(email);

    await axios
      .post(url + '/api/users/signup/emailDuplicateCheck', {
        email: email,
      })
      .then((res) => {
        if (res.data.success) {
          setEmailDuplicateCheck(true);
          console.log('email success: ', res);
          alert('사용 가능한 email입니다.');
        } else {
          console.log('email fail: ', res.data);
          setEmail('');
          alert('중복된 email입니다. 다른 email을 입력해주세요.');
        }
      });
  }

  async function handleNicknameDuplicateCheck(e: {
    preventDefault: () => void;
  }) {
    e.preventDefault();
    console.log(nickname);

    await axios
      .post('http://localhost:8080/api/users/signup/nicknameDuplicateCheck', {
        nickname: nickname,
      })
      .then((res) => {
        if (res.data.success) {
          console.log('nickname success: ', res.data);
          setNicknameDuplicateCheck(true);
          alert('사용 가능한 nickname입니다.');
        } else {
          console.log('nickname fail: ', res.data);
          setNickname('');
          alert('중복된 nickname입니다. 다른 nickname을 입력해주세요.');
        }
      });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email, nickname, password, passwordCheck);

    await axios
      .post('http://localhost:8080/api/users/signup', {
        email: email,
        nickname: nickname,
        password: password,
      })
      .then((res) => {
        console.log(res);
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
          <SignupHeader>회원가입</SignupHeader>
          <SignupForm onSubmit={handleSubmit}>
            <EmailContainer>
              이메일
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailDuplicateCheck}
                placeholder="email@email.com"
              />{' '}
              {email === '' ? (
                <button disabled>중복확인</button>
              ) : (
                <button onClick={handleEmailDuplicateCheck}>중복확인</button>
              )}
            </EmailContainer>
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
            <NicknameContainer>
              닉네임
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={nicknameDuplicateCheck}
                placeholder="nickname"
              />{' '}
              {nickname === '' ? (
                <button disabled>중복확인</button>
              ) : (
                <button onClick={handleNicknameDuplicateCheck}>중복확인</button>
              )}
            </NicknameContainer>
            <ErrorMessageContainer>
              {nickname
                ? nickname.length < 2 && (
                    <p>닉네임을 2자리 이상 입력해주세요.</p>
                  )
                : ''}
            </ErrorMessageContainer>
            <PasswordContainer>
              비밀번호
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />{' '}
            </PasswordContainer>
            <ErrorMessageContainer>
              {password
                ? password.length < 8 && (
                    <p>비밀번호를 8자리 이상 입력해주세요.</p>
                  )
                : ''}
            </ErrorMessageContainer>
            <PasswordCheckContainer>
              비밀번호 확인
              <input
                type="password"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                placeholder="password"
              />
            </PasswordCheckContainer>
            <ErrorMessageContainer>
              {passwordCheck && password !== passwordCheck && (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}
            </ErrorMessageContainer>
            <FormSubmit
              value="가입하기"
              type="submit"
              disabled={
                !emailDuplicateCheck ||
                !nicknameDuplicateCheck ||
                !(password === passwordCheck)
              }
            />
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
  width: 128rem;
  height: 72rem;
  overflow: auto;
`;

const SingupContainer = styled.div`
  background-color: var(--background--gray);
  padding: 0.5rem 0;
`;

const SignupHeader = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: var(--color--header);
  color: white;
  font-size: 2rem;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 8rem;
  padding: 5rem;
`;

const EmailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.5fr;
  font-size: 3.5rem;
  input {
    font-size: 3rem;
    margin-right: 2rem;
  }
  margin: 1.5rem 0;
`;

const NicknameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.5fr;
  font-size: 3.5rem;
  input {
    font-size: 3rem;
    margin-right: 2rem;
  }
  margin: 1.5rem 0;
`;

const PasswordContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  font-size: 3.5rem;
  input {
    font-size: 3rem;
  }

  margin: 1.5rem 0;
`;

const PasswordCheckContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  font-size: 3.5rem;
  input {
    font-size: 3rem;
  }
  margin: 1.5rem 0;
`;

const FormSubmit = styled.input`
  font-size: 3.5rem;
  border: 1px solid black;
  margin: 2rem 0 0 0;
`;

const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: red;
`;
