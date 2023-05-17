import styled from "styled-components";

function MyPage() {
  return (
    <Container>
      <Header_Bar>
        <p>마이페이지</p>
      </Header_Bar>
      <Content>
        <h1>여긴 내용</h1>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
  width: 1404;
`;

const Header_Bar = styled.div`
  margin: 0;
  width: 100%;
  border: 1px solid black;
`;

const Content = styled.div`
  width: 90%;
  border: 1px solid black;
`;

export default MyPage;
