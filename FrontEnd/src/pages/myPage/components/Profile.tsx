import styled from "styled-components";
import "../components/Profile.css";
type ProfileProps = {
  user: string;
  img: string;
  nick: string;
};

function Profile({ user, img, nick }: ProfileProps) {
  return (
    <>
      <h1 className="greeting">{`안녕하세요 ${user}님!`}</h1>
      <div
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.2)",
          width: "90%",
          margin: "0 auto",
        }}
      ></div>
      <Profile_Box>
        <div className="avartar">
          <img src={img} alt="유저 프로필" />
          <div className="nick_box">
            <p>{user}</p>
            <p>{nick}</p>
          </div>
        </div>
        <Logout_Button>로그아웃</Logout_Button>
      </Profile_Box>
    </>
  );
}

const Profile_Box = styled.div`
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

const Logout_Button = styled.button`
  margin: 3rem;
  padding: 2rem;
  width: 12rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  justify-self: end;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
`;
export default Profile;
