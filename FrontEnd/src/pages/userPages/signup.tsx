import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import MainBody from "../mainPage/main-body";
import MainFooter from "../mainPage/main-footer";

function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState(false);
  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState(false);
  const [mainModal, setMainModal] = useState(false);

  const navigate = useNavigate();

  async function handleEmailDuplicateCheck(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log(email);

    await axios
      .post("http://localhost:8080/api/users/signup/emailDuplicateCheck", {
        email: email,
      })
      .then((res) => {
        if (res.data.success) {
          setEmailDuplicateCheck(true);
          console.log("email success: ", res);
          alert("사용 가능한 email입니다.");
        } else {
          console.log("email fail: ", res.data);
          setEmail("");
          alert("중복된 email입니다. 다른 email을 입력해주세요.");
        }
      });
  }

  async function handleNicknameDuplicateCheck(e: {
    preventDefault: () => void;
  }) {
    e.preventDefault();
    console.log(nickname);

    await axios
      .post("http://localhost:8080/api/users/signup/nicknameDuplicateCheck", {
        nickname: nickname,
      })
      .then((res) => {
        if (res.data.success) {
          console.log("nickname success: ", res.data);
          setNicknameDuplicateCheck(true);
          alert("사용 가능한 nickname입니다.");
        } else {
          console.log("nickname fail: ", res.data);
          setNickname("");
          alert("중복된 nickname입니다. 다른 nickname을 입력해주세요.");
        }
      });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email, nickname, password, passwordCheck);

    await axios
      .post("http://localhost:8080/api/users/signup", {
        email: email,
        nickname: nickname,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert(`회원가입이 완료되었습니다. 환영합니다 ${nickname}님!`);
          navigate("/login");
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
      <SignupHeader>회원가입 페이지 입니다.</SignupHeader>
      <SignupForm onSubmit={handleSubmit}>
        <FormContent>
          이메일
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailDuplicateCheck}
          />{" "}
          <button onClick={handleEmailDuplicateCheck}>중복확인</button>
          닉네임
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={nicknameDuplicateCheck}
          />{" "}
          <button onClick={handleNicknameDuplicateCheck}>중복확인</button>
          {nickname
            ? nickname.length < 2 && <p>닉네임을 2자리 이상 입력해주세요.</p>
            : ""}
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          {password
            ? password.length < 8 && <p>비밀번호를 8자리 이상 입력해주세요.</p>
            : ""}
          비밀번호 확인
          <input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          {password !== passwordCheck && <p>비밀번호가 일치하지 않습니다.</p>}
        </FormContent>
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
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
}
export default Signup;

const SignupHeader = styled.h1`
  display: flex;
`;

const SignupForm = styled.form`
  border: 1px solid black;
  width: 25rem;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormSubmit = styled.input``;
