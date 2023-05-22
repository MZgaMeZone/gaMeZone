import Container from './components/container';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';

function PasswordChange() {
  const [currPwd, setCurrPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newPwdCheck, setNewPwdCheck] = useState('');
  const [isPwdSame, setIsPwdSame] = useState(false);
  const [isVisible, isSetVisible] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!newPwd || !newPwdCheck || !currPwd) {
      alert('모든 항목은 필수조건 입니다!');
      e.preventDefault();
    } else if (!isPwdSame) {
      alert('비밀번호가 일치하지 않습니다!');
      e.preventDefault();
    } else if (newPwd.length < 8 && newPwdCheck.length < 8) {
      alert('비밀번호는 8글자 이상 입니다.');
      e.preventDefault();
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (newPwd !== '' || newPwdCheck !== '') {
      isSetVisible(true);
    }
    if (newPwd !== '' && newPwd === newPwdCheck) {
      setIsPwdSame(true);
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
        <Line></Line>
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
            <Check style={{ display: isVisible ? 'block' : 'none' }}>
              {isPwdSame ? (
                <p style={{ color: 'green' }}>비밀번호가 일치합니다 :)</p>
              ) : (
                <p style={{ color: 'tomato' }}>
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
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  }

  label {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
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
  margin-left: 5rem;
  margin-top: 3rem;
`;

const Check = styled.div`
  font-size: 1.8rem;
  color: red;
`;

const Line = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: 0 auto;
`;

export default PasswordChange;
