import Container from "./components/container";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MouseEvent, FormEvent } from "react";

function NicknameChange() {
  //현재 닉네임이 placeholder로 이미 보이고 있어야하고
  //새로운 닉네임은 중복검사해야 함.

  const [currenNickname, setCurrentNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  const duplicateCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const existingNicknames = ["John", "Jane", "Mike"];
    if (existingNicknames.includes(newNickname)) {
      setIsDuplicate(true);
      alert("이미 존재하는 닉네임 입니다.");
    } else {
      setIsDuplicate(false);
      alert("사용가능한 닉네임 입니다.");
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case "current-nickname":
        setCurrentNickname(e.currentTarget.value);
        break;

      case "new-nickname":
        setNewNickname(e.currentTarget.value);
        console.log(e.currentTarget.value);
        break;
    }
  };

  return (
    <>
      <Container>
        <Title> 닉네임 변경</Title>
        <NicknameChangeForm>
          <form action="">
            <label htmlFor="current-nickname">현재 닉네임</label>
            <input
              type="text"
              id="current-nickname"
              name="current-nickname"
              onChange={handleChange}
              value={currenNickname}
              placeholder="비밀번호는 8글자 이하입니다"
            />
            <NicknameCheck>
              <NewnicknameBox>
                <label htmlFor="new-password">새로운 닉네임</label>
                <input
                  type="text"
                  id="new-nickname"
                  name="new-nickname"
                  value={newNickname}
                  onChange={handleChange}
                  placeholder="새로운 닉네임을 입력해주세요"
                />
              </NewnicknameBox>
              <button onClick={duplicateCheck}>중복확인</button>
            </NicknameCheck>
            <button>닉네임 변경</button>
            {/* 여기다가 나중에 axios요청 달면 됨. */}
          </form>
        </NicknameChangeForm>
      </Container>
    </>
  );
}

const NewnicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

const NicknameChangeForm = styled.div`
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
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  }

  label {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
    &:first-of-type {
      margin-top: 0.5rem;
    }
  }

  button {
    height: 5rem;
    margin: 3rem 0 3rem 0;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
    background-color: var(--color--header);
    border-radius: 0.5rem;
    color: white;
    &:active {
      box-shadow: none;
      box-shadow: inset 0.3rem 0.3rem 0.3rem 0rem rgba(0, 0, 0, 0.3);
    }
  }
`;

const Title = styled.h1`
  margin-left: 5.8rem;
  margin-top: 3rem;
`;

const NicknameCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 95%;
    box-sizing: border-box;
  }

  button {
    margin-top: 4rem;
    width: 20%;
  }
`;

export default NicknameChange;
