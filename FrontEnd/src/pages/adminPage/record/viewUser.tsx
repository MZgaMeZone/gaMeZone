import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../../style/icons/icons8-google.svg';
const ViewUser = () => {
  const [input, setInput] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleClick = () => {
    console.log(input);
    setInput('');
  };
  return (
    <Content>
      <SearchInput
        onChange={handleChange}
        placeholder="조회할 유저의 닉네임을 입력해주세요."
      ></SearchInput>
      <Button onClick={handleClick}>
        <Search />
      </Button>
    </Content>
  );
};

export default ViewUser;

const Content = styled.div`
  display: flex;
`;
const SearchInput = styled.input`
  width: 60rem;
  height: 5rem;
  padding: 1rem 2rem;
  margin-right: 1rem;
  border-radius: 15px;
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 10px;
  outline: none;
`;
const Button = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:active {
    transform: scale(1.1);
  }
`;
