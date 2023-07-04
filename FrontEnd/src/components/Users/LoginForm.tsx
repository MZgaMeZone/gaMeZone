import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContainerHeader from '../Common/ContainerHeader';
import ButtonSmall from '../Common/ButtonSmall';
import lockIcon from '../../style/icons/lock.svg';
import keyIcon from '../../style/icons/key.svg';

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
      <ContainerHeader
        favicon={keyIcon}
        title="로그인"
        onClick={() => navigate(-1)}
      />
      <LoginFormContainer onSubmit={handleSubmit}>
        <ContainerBody>
          <LoginIcon>
            <img src={lockIcon} />
          </LoginIcon>
          <InputContainer>
            <InputForm>
              <p>Email</p>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </InputForm>
            <InputForm>
              <p>Password</p>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
  div {
    background: white;
    position: relative;
    box-sizing: border-box;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(132, 133, 132) rgb(254, 254, 254) rgb(254, 254, 254)
      rgb(132, 133, 132);
    input {
      height: 4.3rem;
      width: 35rem;
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
