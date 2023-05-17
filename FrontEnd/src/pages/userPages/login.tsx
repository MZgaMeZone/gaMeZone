import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import MainFooter from "../mainPage/main-footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mainModal, setMainModal] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          localStorage.setItem("access_token : ", res.data.token);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <LoginForm onSubmit={handleSubmit}>
        이메일{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <LoginButton>로그인</LoginButton>
        <SignupButton onClick={() => navigate("/signup")}>
          회원가입
        </SignupButton>
      </LoginForm>
      <MainFooter mainModal={mainModal} setMainModal={setMainModal} />
    </>
  );
}
export default Login;

const LoginForm = styled.form``;
const LoginButton = styled.button``;
const SignupButton = styled.button``;
