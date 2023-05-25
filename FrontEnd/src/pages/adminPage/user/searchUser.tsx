import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../../style/icons/icons8-google.svg';
const SearchUser = () => {
  return (
    <Container>
      <Title>회원 검색</Title>
      <div>
        <SearchInput placeholder="검색할 유저의 닉네임을 입력해주세요."></SearchInput>
        <Button>
          <Search />
        </Button>
      </div>
    </Container>
  );
};

export default SearchUser;
const Container = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 2px solid #e0e0e0;
  div {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
  }
`;
const Title = styled.p`
  margin: 3rem 0 0 5rem;
  font-size: 2.4rem;
  margin-bottom: 4rem;
  font-weight: 600;
`;
const SearchInput = styled.input`
  width: 60rem;
  height: 5rem;
  padding: 1rem 2rem;
  margin-right: 0.5rem;
  border-radius: 15px;
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 10px;
  outline: none;
  color: #242424;
  font-size: 2rem;
`;
const Button = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:active {
    transform: scale(1.1);
  }
`;
