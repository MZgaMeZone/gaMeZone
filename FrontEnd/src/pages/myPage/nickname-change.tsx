import Container from './components/container';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MouseEvent, FormEvent } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const userToken: string | null = localStorage.getItem('userToken');

function NicknameChange() {
  const [currenNickname, setCurrentNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const getCurrentNickname = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    await axios.get(url + '/api/users', config).then((res) => {
      console.log(res.data);
      setUserEmail(res.data.userEmail);
      setCurrentNickname(res.data.nickname);
    });
  };

  useEffect(() => {
    getCurrentNickname();
  }, []);

  const duplicateCheck = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('newNickname: ', newNickname);
    await axios
      .post(url + '/api/users/signup/nicknameDuplicateCheck', {
        nickname: newNickname,
      })
      .then((res) => {
        if (res.data.success) {
          console.log('nickname success: ', res.data);
          alert('사용 가능한 nickname입니다.');
        } else {
          console.log('nickname fail: ', res.data);
          setIsDuplicate(true);
          setNewNickname('');
          alert('중복된 nickname입니다. 다른 nickname을 입력해주세요.');
        }
      });
  };

  const updateNickname = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    console.log('일단 이거 대기!'); //isDuplicate값이 true면 return

    const patchScoreBody = {
      userNickname: newNickname,
      userEmail: userEmail,
    };

    await axios
      .patch(`${url}/api/users/nicknameChange`, { newNickname }, config)
      .then((res) => {
        axios.patch(`${url}/api/scores`, patchScoreBody, config);
        alert(`${res.data.nickname}님 성공적으로 변경되었습니다!`);
        navigate('/mypage');
      })
      .catch((err) => {
        console.log('에러 발생', err);
      });
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'current-nickname':
        setCurrentNickname(e.currentTarget.value);
        break;

      case 'new-nickname':
        setNewNickname(e.currentTarget.value);
        break;
    }
  };

  return (
    <>
      <Container>
        <Title> 닉네임 변경</Title>
        <Line></Line>
        <NicknameChangeForm>
          <form action="">
            <label htmlFor="current-nickname">현재 닉네임</label>
            <input
              type="text"
              id="current-nickname"
              name="current-nickname"
              onChange={handleChange}
              value={currenNickname}
              disabled={true}
            />
            <NicknameCheck>
              <NewnicknameBox>
                <label htmlFor="new-password">새로운 닉네임</label>
                <input
                  type="text"
                  id="new-nickname"
                  name="new-nickname"
                  onChange={handleChange}
                  placeholder="새로운 닉네임을 입력해주세요"
                />
              </NewnicknameBox>
              <button onClick={duplicateCheck}>중복확인</button>
            </NicknameCheck>
            <button onClick={updateNickname}>닉네임 변경</button>
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

const Line = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: 0 auto;
`;

export default NicknameChange;
