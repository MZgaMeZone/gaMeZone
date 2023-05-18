import Container from "./components/Container";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NicknameChange() {
  return (
    <>
      <Container>
        <Link to="/mypage">
          <Title> 닉네임 변경</Title>
        </Link>
      </Container>
    </>
  );
}

const Title = styled.h1`
  margin-left: 5rem;
  margin-top: 3rem;
`;

export default NicknameChange;
