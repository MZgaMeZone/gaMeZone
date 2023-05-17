import { Link } from "react-router-dom";
import styled from "styled-components";

function UserInfo() {
  return (
    <>
      <h1>계정</h1>
      <UserInfo_Box>
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
      </UserInfo_Box>
    </>
  );
}
const UserInfo_Box = styled.div`
  margin-bottom: 2rem;
  padding: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
`;

export default UserInfo;
