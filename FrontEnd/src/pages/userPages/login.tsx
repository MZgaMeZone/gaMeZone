import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import MainFooter from "../mainPage/main-footer";
import MainBody from "../mainPage/main-body";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mainModal, setMainModal] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("이메일 비밀번호 빈칸");
      return alert("이메일과 비밀번호 모두 입력해주세요.");
    }
    axios
      .post("http://localhost:8080/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("access_token : ", res.data.userToken);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("올바른 이메일과 비밀번호를 입력하세요.");
      });
  }

  return (
    <div
      style={{
        backgroundColor: "#008080",
        height: "100vh",
        width: "100vw",
        minHeight: "880px",
        minWidth: "900px",
      }}
    >
      <LoginSection>
        <LoginContainer>
          <LoginHeader>로그인</LoginHeader>

          <LoginForm onSubmit={handleSubmit}>
            <EmailForm>
              <p>이메일</p>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </EmailForm>
            <PasswordForm>
              비밀번호
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </PasswordForm>
            <LoginButton type="submit">로그인</LoginButton>
            <SignupButton onClick={() => navigate("/signup")}>
              회원가입
            </SignupButton>
          </LoginForm>
        </LoginContainer>
      </LoginSection>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
}
export default Login;

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

const LoginForm = styled.form`
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
