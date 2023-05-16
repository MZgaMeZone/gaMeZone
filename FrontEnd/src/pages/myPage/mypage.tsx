import styled from "styled-components";
import "../../style/reset.css";
import "../myPage/mypage.css";

const user = { name: "혜린" };

function MyPage() {
  return (
    <Container>
      <Header_Bar>
        <div className="title">
          <p>마이페이지</p>
        </div>
        <div className="close_button">
          <button className="close_btn">x</button>
        </div>
      </Header_Bar>
      <Content>
        <div className="profile">
          <h1>{`안녕하세요 ${user.name}님`}</h1>
          <div className="avartar">
            <img src="../../" alt="v" />
          </div>
        </div>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  margin: 3rem auto;
  width: 1280px;
  height: 720px;
  border-radius: 3px;
  background-color: var(--background--gray);
`;

const Header_Bar = styled.div`
  display: flex;
  padding: 0.7rem;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: var(--color--header);
  color: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 22px auto;
  width: 90%;
  height: 85%;
  border-radius: 5px;
  background-color: white;
`;

export default MyPage;
