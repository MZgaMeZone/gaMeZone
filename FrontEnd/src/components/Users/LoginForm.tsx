import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContainerHeader from '../Common/ContainerHeader';
import ButtonSmall from '../Common/ButtonSmall';
import keyIcon from '../../style/icons/lock.svg';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
}

function LoginForm({ onLogin, onSignup }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <LoginSection>
      <ContainerHeader title="로그인" onClick={() => navigate(-1)} />
      <LoginFormContainer onSubmit={handleSubmit}>
        <ContainerBody>
          <LoginIcon>
            <img src={keyIcon} />
          </LoginIcon>
          <InputContainer>
            <InputForm>
              <p>Email</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputForm>
            <InputForm>
              <p>Password</p>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputForm>
          </InputContainer>
        </ContainerBody>
        <ButtonContainer>
          <ButtonSmall text="회원가입" onClick={onSignup} />
          <ButtonSmall text="로그인" type="submit" />
        </ButtonContainer>
      </LoginFormContainer>
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
  width: 74rem;
  height: 35rem;
  overflow: auto;
`;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;
const ContainerBody = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
`;

const LoginIcon = styled.div`
  width: 10rem;
  height: 10rem;
  margin-top: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 3rem;
`;

const InputForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  font-size: 2.7rem;
  p {
    display: flex;
    align-items: center;
  }
  input {
    height: 4.3rem;
    width: 35rem;
    font-size: 2.7rem;
    padding-left: 2rem;
    border: none;
    box-shadow: inset 0.2rem 0.2rem 0.2rem 0rem #000000,
      0.2rem 0.2rem 0.2rem 0rem #e0e0e0;
  }
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  div:first-child {
    margin-right: 1rem;
  }
`;
