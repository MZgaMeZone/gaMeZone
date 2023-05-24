import styled from 'styled-components';
import '../../../style/profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type ProfileProps = {
  email: string;
  img: string;
  nickName: string;
};

function Profile({ img, email, nickName }: ProfileProps) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };
  return (
    <>
      <h1 className="greeting">{`안녕하세요 ${email}님!`}</h1>
      <div
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.2)',
          width: '90%',
          margin: '0 auto',
        }}
      ></div>
      <ProfileBox>
        <div className="avartar">
          <img src={img} alt="유저 프로필" />
          <div className="nick_box">
            <p>{email}</p>
            <p>{nickName}</p>
          </div>
        </div>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ProfileBox>
    </>
  );
}

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem auto;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
`;

const LogoutButton = styled.button`
  margin: 3rem;
  padding: 2rem;
  width: 12rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  justify-self: end;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  &:active {
    box-shadow: none;
    box-shadow: inset 0.3rem 0.3rem 0.3rem 0rem rgba(0, 0, 0, 0.3);
  }
  &:hover {
    background-color: var(--color--header);
    color: white;
  }
`;
export default Profile;
