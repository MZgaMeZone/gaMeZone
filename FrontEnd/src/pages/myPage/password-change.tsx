import Container from "./components/Container";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function PasswordChange() {
  const [currPwd, setCurrPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdCheck, setNewPwdCheck] = useState("");
  const [isPwdSame, setIsPwdSame] = useState(false);
  const [isVisible, isSetVisible] = useState(false);

  const handleClick = () => {
    if (!newPwd || !newPwdCheck || !currPwd) {
      alert("모든 항목은 필수조건 입니다!");
    }
    if (!isPwdSame) {
      alert("비밀번호가 일치하지 않습니다!");
    }
  };

  useEffect(() => {
    if (newPwd !== "" && newPwd === newPwdCheck) {
      setIsPwdSame(true);
      isSetVisible(true);
    } else {
      setIsPwdSame(false);
    }
  }, [newPwd, newPwdCheck]);

  return (
    <>
      <Container>
        <Link to="/mypage">
          <Title>비밀번호 변경</Title>
        </Link>
        <div
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            width: "90%",
            margin: "0 auto",
          }}
        ></div>
        <PasswordFrom>
          <form action="">
            <label htmlFor="current-password">현재 비밀번호</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              placeholder="비밀번호는 8글자 이상입니다"
              onChange={(e) => {
                setCurrPwd(e.target.value);
              }}
            />
            <label htmlFor="new-password">새 비밀번호</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="비밀번호는 8글자 이상입니다"
              onChange={(e) => {
                setNewPwd(e.target.value);
              }}
            />
            <label htmlFor="new-password-check">새 비밀번호 확인</label>
            <input
              type="password"
              id="new-password-check"
              name="new-password-check"
              placeholder="비밀번호는 8글자 이상입니다"
              onChange={(e) => {
                setNewPwdCheck(e.target.value);
              }}
            />
            <Check style={{ display: isVisible ? "block" : "none" }}>
              {isPwdSame ? (
                <p style={{ color: "green" }}>비밀번호가 일치합니다 :)</p>
              ) : (
                <p style={{ color: "tomato" }}>
                  비밀번호가 일치하지 않습니다:(
                </p>
              )}
            </Check>
            <button onClick={handleClick}>비밀번호 변경</button>
          </form>
        </PasswordFrom>
      </Container>
    </>
  );
}

const PasswordFrom = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    padding: 2rem;
  }

  input {
    height: 5rem;
    margin-bottom: 2rem;
    box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
  }

  label {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }

  button {
    height: 5rem;
    margin: 3rem 0 3rem 0;
    box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
    background-color: var(--color--header);
    border-radius: 0.5rem;
    color: white;
  }
`;

const Title = styled.h1`
  margin-left: 5rem;
  margin-top: 3rem;
`;

const Check = styled.div`
  font-size: 1.8rem;
  color: red;
`;

export default PasswordChange;
