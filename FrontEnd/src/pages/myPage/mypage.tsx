import styled from 'styled-components';
import '../../style/reset.css';
import '../../style/mypage.css';
import img from './img-1682667302883.png';
import Footer from '../mainPage/main-footer';
import Container from './components/container';
import Profile from './components/profile';
import UserInfo from './components/userInfo';
import UserCommu from './components/userCommu';

const user = { id: 'flsgp123', nick: '내닉네임은너무나도길어' };

function MyPage() {
  return (
    <>
      <Container>
        <Profile img={img} user={user.id} nick={user.nick} />
        <Content>
          <UserInfo />
          <UserCommu />
        </Content>
      </Container>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 90%;
  height: 85%;
  border-radius: 5px;
`;

export default MyPage;
