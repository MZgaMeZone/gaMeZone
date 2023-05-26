import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ReactComponent as Search } from '../../../style/icons/icons8-google.svg';
import UserModal from './userModal';
import { Config, Props, User } from './userInterface';

const SearchUser = ({ URL }: Props) => {
  //검색창 닉네임 값 받아옴
  const [nicknameInput, setNicknameInput] = useState<string>('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameInput(e.target.value);
  };
  //모달창 open, close에 쓰일 상태
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 검색창이 클릭될 경우 (모달창이 open될 경우), 검색한 데이터를 담아준다.
  const [userData, setUserData] = useState<User[]>([]);
  // 검색시 유저데이터가 없다면(length === 0) alert 띄어주고 모달 X
  //유저데이터가 있다면 모달 O
  const openModal = (value: boolean) => {
    axios
      .get(`${URL}/search/${nicknameInput}`, Config)
      .then((res) => {
        setUserData(res.data);
        if (res.data.length === 0) {
          window.alert(`[${nicknameInput}] 유저는 존재하지 않습니다.`);
        } else {
          setIsOpen(value);
        }
      })
      .catch((err) => console.log(err));
  };

  //모달창 close
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <UserModal isOpen={isOpen} onClose={closeModal} data={userData} />
      )}
      <Container>
        <Title>회원 검색</Title>
        <div>
          <SearchInput
            value={nicknameInput}
            onChange={(e) => handleInputChange(e)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') openModal(true);
            }}
            placeholder="검색할 유저의 닉네임을 입력해주세요."
          ></SearchInput>
          <Button onClick={() => openModal(true)}>
            <Search style={{ width: '5.2rem', height: '5.2rem' }} />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default SearchUser;
const Container = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 2px solid #e0e0e0;
  div {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
  }
`;
const Title = styled.p`
  margin: 3rem 0 0 5rem;
  font-size: 2.4rem;
  margin-bottom: 4rem;
  font-weight: 600;
`;
const SearchInput = styled.input`
  width: 60rem;
  height: 5.4rem;
  padding: 1rem 2rem;
  margin-right: 0.5rem;
  border-radius: 15px;
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 10px;
  outline: none;
  color: #242424;
  font-size: 2rem;
  font-size: 2rem;
`;
const Button = styled.div`
  &:active {
    transform: scale(1.1);
  }
`;
