import Container from "./components/Container";
import styled from "styled-components";

function PasswordChange() {
  return (
    <>
      <Container>
        <Title>비밀번호 변경</Title>
        <div
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            width: "90%",
            margin: "0 auto",
          }}
        ></div>
        <PasswordFrom>
          <form action="">
            <label htmlFor="current-password">현재 비밀번호</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
            />
            <label htmlFor="new-password">새 비밀번호</label>
            <input type="password" id="new-password" name="new-password" />
            <label htmlFor="new-password-check">새 비밀번호 확인</label>
            <input
              type="password"
              id="new-password-check"
              name="new-password-check"
            />
            <button>비밀번호 변경</button>
          </form>
        </PasswordFrom>
      </Container>
    </>
  );
}

const PasswordFrom = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    padding: 2rem;
  }

  input {
    height: 5rem;
    margin-bottom: 2rem;
    box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
  }

  label {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  button {
    height: 5rem;
    margin: 3rem 0 3rem 0;
    box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
    background-color: var(--color--header);
    border-radius: 0.5rem;
    color: white;
  }
`;

const Title = styled.h1`
  margin-left: 5rem;
  margin-top: 3rem;
`;

export default PasswordChange;
