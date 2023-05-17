import styled from "styled-components";
import "../../style/reset.css";
import "../myPage/Mypage.css";
import img from "./img-1682667302883.png";
import Footer from "../mainPage/main-footer";
import Container from "./components/Container";
import Profile from "./components/Profile";
import UserInfo from "./components/UserInfo";
import UserCommu from "./components/UserCommu";

const user = { id: "flsgp123", nick: "내닉네임은너무나도길어" };

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
