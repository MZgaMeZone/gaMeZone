import Container from "./components/Container";
import styled from "styled-components";

function PasswordChange() {
  return (
    <>
      <Container>
        <h1>비밀번호 변경</h1>
        <div className="password-form">
          <form action="">
            <label htmlFor="current-password">현재 비밀번호</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
            />
          </form>
        </div>
      </Container>
    </>
  );
}

export default PasswordChange;
