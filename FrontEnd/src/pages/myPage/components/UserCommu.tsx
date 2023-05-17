import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function UserCommu() {
  return (
    <div>
      <h1>커뮤니티</h1>
      <Community_Container>
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
    </div>
  );
}
const Community_Container = styled.div`
  margin-bottom: 2rem;
  padding: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: white;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
`;

export default UserCommu;
