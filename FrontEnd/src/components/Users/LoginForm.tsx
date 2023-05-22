import React, { useState } from 'react';
import styled from 'styled-components';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
}

function LoginForm({ onLogin, onSignup }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <LoginSection>
      <LoginContainer>
        <LoginHeader>로그인</LoginHeader>

        <LoginFormContainer onSubmit={handleSubmit}>
          <EmailForm>
            <p>이메일</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </EmailForm>
          <PasswordForm>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </PasswordForm>
          <LoginButton type="submit">로그인</LoginButton>
          <SignupButton onClick={onSignup}>회원가입</SignupButton>
        </LoginFormContainer>
      </LoginContainer>
    </LoginSection>
  );
}

export default LoginForm;

const LoginSection = styled.div`
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

const LoginContainer = styled.div`
  background-color: var(--background--gray);
  padding: 0.5rem 0;
`;

const LoginHeader = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: var(--color--header);
  color: white;
  font-size: 2rem;
`;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 12rem;
  padding: 7rem;
`;

const EmailForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-size: 3.5rem;
  input {
    font-size: 3rem;
  }
  margin: 1.5rem 0;
`;

const PasswordForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-size: 3.5rem;
  input {
    font-size: 2.5rem;
  }
  margin: 1.5rem 0;
`;
const LoginButton = styled.button`
  font-size: 2.5rem;
  margin: 1rem 0;
  border: 1px solid black;
  margin: 3rem 0 1.5rem;
`;
const SignupButton = styled.button`
  font-size: 2.5rem;
  margin: 1.5rem 0;
  border: 1px solid black;
`;
