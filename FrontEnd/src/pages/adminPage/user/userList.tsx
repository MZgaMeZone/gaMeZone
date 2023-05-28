import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Config, User, Props, URL } from './userInterface';
import UserDataContext from './userDataContext';

const UserList = () => {
  const [userData, setUserData] = useState<User[]>([]);

  //회원 리스트 불러오는 get 요청
  useEffect(() => {
    axios
      .get(`${URL}/allUsers`, Config)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //회원 탈퇴 요청
  const handleDeleteClick = (email: string, nickname: string, id: string) => {
    const deleteConfirm = window.confirm(`[${nickname}]님을 탈퇴시키겠습니까?`);
    if (deleteConfirm) {
      axios
        .delete(`${URL}/userDelete/${email}`, Config)
        .then((res) => setUserData(userData.filter((item) => item._id !== id))) //탈퇴 후 삭제된 유저 데이터 바로 반영
        .catch((err) => console.log(err));
    }
  };
  //모달창에서 삭제된 데이터반영
  //context로 삭제한 아이디 받아오고 삭제한 아이디에 필터후 userData를 업데이트 해준다.
  const [deleteData] = useContext(UserDataContext);
  useEffect(() => {
    const updateData = userData.filter((item) => item._id !== deleteData);
    if (updateData) {
      setUserData(updateData);
    }
  }, [deleteData]);
  const mapping = userData.map((item) => console.log(item.userIcon));
  console.log(mapping);
  return (
    <Container>
      <Title>회원 리스트</Title>
      <Main>
        <NavBar>
          <p>프로필</p>
          <p style={{ margin: '0 0 0 10rem' }}>닉네임</p>
          <p style={{ margin: '0 0 0 20rem' }}>이메일</p>
        </NavBar>
        {userData.map((item) => (
          <Content key={item._id}>
            <ImageContent>
              <GameImage
                src={`${process.env.REACT_APP_API_URL}/${item.userIcon}`}
                alt="프로필 이미지"
              />
            </ImageContent>
            <NameText>{item.nickname}</NameText>
            <EmailText>{item.email}</EmailText>
            <ButtonDiv>
              <Button
                onClick={() =>
                  handleDeleteClick(item.email, item.nickname, item._id)
                }
              >
                탈퇴
              </Button>
            </ButtonDiv>
          </Content>
        ))}
      </Main>
      <FooterDiv></FooterDiv>
    </Container>
  );
};

export default UserList;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const Title = styled.p`
  margin: 5rem;
  font-size: 2.4rem;
  margin-bottom: 4rem;
  font-weight: 600;
`;
const Main = styled.div`
  position: relative;
  width: 110rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;
const NavBar = styled.div`
  display: flex;
  width: 100%;
  padding: 1.4rem 0 1.4rem 7rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: #242424;
  background: #ebeded;

  border-top: 3px solid #b9b9b9;
  border-bottom: 3px solid #b9b9b9;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  background: #f5fafa;
  p {
    position: absolute;
    font-size: 2rem;
  }
`;
const NameText = styled.p`
  left: 22rem;
`;
const EmailText = styled.p`
  left: 47rem;
`;
const ImageContent = styled.div`
  margin: 1rem 0 1rem 5rem;
  width: 9rem;
  height: 9rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  overflow: hidden;
`;
const GameImage = styled.img`
  width: 10rem;
`;
const ButtonDiv = styled.div`
  position: absolute;
  right: 5rem;
`;
const Button = styled.button`
  margin-right: 2rem;
  width: 9rem;
  height: 4.4rem;
  background: #000080;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.8rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 128, 0.8);
  }
  &:active {
    background: rgba(0, 0, 128, 0.6);
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
const FooterDiv = styled.div`
  padding: 5rem;
  border-bottom: 2px solid #e0e0e0;
`;
