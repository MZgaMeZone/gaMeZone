import React, { useContext } from 'react';
import styled from 'styled-components';
import { User, Config, URL } from './userInterface';
import axios from 'axios';
import UserDataContext from './userDataContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: User[];
}

const UserModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [, setDeleteData] = useContext(UserDataContext);

  if (!isOpen) {
    return null;
  }

  //회원 탈퇴 요청

  const handleDeleteClick = (
    email: string,
    nickname: string,
    deleteId: string
  ) => {
    const deleteConfirm = window.confirm(`[${nickname}]님을 탈퇴시키겠습니까?`);
    if (deleteConfirm) {
      axios
        .delete(`${URL}/userDelete/${email}`, Config)

        .then((res) => setDeleteData(deleteId))
        .catch((err) => console.log(err));
    }
  };

  return (
    <ModalContainer>
      <Header>
        <Close onClick={onClose}>&times;</Close>
      </Header>
      <ModalContent>
        <Main>
          <NavBar>
            <p>프로필</p>
            <p style={{ margin: '0 0 0 7rem' }}>닉네임</p>
            <p style={{ margin: '0 0 0 18rem' }}>이메일</p>
          </NavBar>
          {Array.isArray(data) &&
            data.map((item: User) => (
              <Content key={item._id}>
                <ImageContent>
                  <GameImage
                    src={`${process.env.REACT_APP_API_URL}/${item.userIcon}`}
                    alt="게임 아이콘"
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
      </ModalContent>
    </ModalContainer>
  );
};

export default UserModal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 86rem;
  height: auto;
  background: #c0c0c0;
  border-radius: 5px;
  border: 2px solid #4a4d4d;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;
const Header = styled.div`
  position: relative;
  width: 100%;
  height: 4rem;
  background: #000080;
`;
const ModalContent = styled.div`
  width: 82rem;
  height: auto;
  margin: 3rem 2rem;
  background: #ffffff;
  border-radius: 5px;
`;
const Close = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  background: #c0c0c0;
  border-radius: 1px;
  font-size: 2.2rem;
  font-weight: 600;
  color: #808080;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;
const Main = styled.div`
  position: relative;
  padding: 2rem;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;
const NavBar = styled.div`
  display: flex;
  width: 100%;
  padding: 1.4rem 0 1.4rem 6rem;
  font-size: 1.6rem;
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
    font-size: 1.8rem;
  }
`;
const NameText = styled.p`
  left: 18rem;
`;
const EmailText = styled.p`
  left: 40rem;
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
  width: 8rem;
  height: 4rem;
  background: #000080;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.7rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 128, 0.8);
  }
  &:active {
    background: rgba(0, 0, 128, 0.6);
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
