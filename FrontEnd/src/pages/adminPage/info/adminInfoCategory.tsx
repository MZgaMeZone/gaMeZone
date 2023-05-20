import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
interface Category {
  _id: string;
  categoryName: string;
}
const AdminInfoCategory = () => {
  const URL: string = 'http://localhost:8080/api/categories';

  const [data, setData] = useState<Category[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = async () => {
    try {
      const res = await axios.post(URL, inputValue);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <AddContainer>
        <Title>카테고리 추가</Title>
        <Input
          type="text"
          placeholder="카테고리를 입력해주세요."
          onChange={handleChange}
        />
        <Button onClick={() => handleClick()}>추가</Button>
      </AddContainer>

      <EditContainer>
        <Title>카테고리 내역</Title>
        {data.map((item: Category) => (
          <EditContent key={item._id}>
            <p>{item.categoryName}</p>
            <Button>수정</Button>
            <Button>삭제</Button>
          </EditContent>
        ))}
      </EditContainer>
    </div>
  );
};

export default AdminInfoCategory;

const AddContainer = styled.div`
  padding: 4rem 6rem;
`;
const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;
const Input = styled.input`
  margin 0 3rem;
  padding: 1.2rem;
  width: 60rem;
  font-size: 2rem;
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 15px;
  outline: none;
`;
const EditContainer = styled.div`
  padding: 2rem 4rem;
`;

const EditContent = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;
const Button = styled.button`
  width: 9rem;
  height: 4.4rem;
  background: #000080;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.8rem;
  cursor: pointer;
`;
