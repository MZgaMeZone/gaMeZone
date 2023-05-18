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
      <h1>로그인 페이지입니다.</h1>
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
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
}
export default Login;

const LoginForm = styled.form``;
const LoginButton = styled.button``;
const SignupButton = styled.button``;
