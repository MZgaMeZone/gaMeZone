import styled from "styled-components";
import "../../style/reset.css";
import "../myPage/mypage.css";
import img from "./img-1682667302883.png";
import { Link } from "react-router-dom";

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
        <Profile>
          <div className="avartar">
            <h1 className="greeting">{`안녕하세요 ${user.name}님!`}</h1>
            <img src={img} alt="v" />
          </div>
          <div className="logout_box">
            <button>로그아웃</button>
          </div>
        </Profile>

        <UserInfo>
          <h1>계정</h1>
          <div className="info_box_content">
            <div>
              <Link to="/mypage/password">
                <h1>비밀번호 변경</h1>
              </Link>
            </div>
            <div>
              <Link to="/mypage/nickname">
                <h1>닉네임 변경</h1>
              </Link>
            </div>
            <div>
              <Link to="/mypage/avartar">
                <h1>프로필 사진 변경</h1>
              </Link>
            </div>
          </div>
        </UserInfo>

        <Community_Container>
          <h1>커뮤니티</h1>
          <div className="community_box_content">
            <div>
              <Link to="/mypage/mycomment">
                <h1>내가 쓴 댓글</h1>
              </Link>
            </div>
            <div>
              <Link to="/mypage/myarticle">
                <h1>내가 쓴 글</h1>
              </Link>
            </div>
          </div>
        </Community_Container>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 780px;
  height: 1000px;
  border-radius: 3px;
  background-color: var(--background--gray);
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
`;

const Header_Bar = styled.div`
  display: flex;
  padding: 0.7rem;
  align-items: center;
  justify-content: center;
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

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem;
  background-color: #d9d9d9;
  border-radius: 5px;
`;

const UserInfo = styled.div`
  padding: 3rem;
  /* width: 40%; */
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const Community_Container = styled.div`
  padding: 3rem;
  width: 40%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export default MyPage;
