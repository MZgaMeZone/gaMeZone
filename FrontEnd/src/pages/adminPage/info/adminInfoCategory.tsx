import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
interface Category {
  _id: string;
  categoryName: string;
}
interface Input {
  editInput: string;
  addInput: string;
}
const AdminInfoCategory = () => {
  const URL: string = 'http://localhost:8080/api/categories';

  const [data, setData] = useState<Category[]>([]);

  // input 처리
  const [inputs, setInputs] = useState<Input>({
    addInput: '',
    editInput: '',
  });

  const { addInput, editInput } = inputs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value, name } = e.target;
    if (name === 'editInput') {
      setEditCategoryName(value);
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //추가

  const addHandleClick = async () => {
    if (addInput === '') {
      alert('카테고리를 입력해주세요.');
    }
    try {
      const res = await axios.post(URL, {
        categoryName: addInput,
      });
      console.log(res.data);
      setData([...data, res.data]);
      setInputs((prev) => ({
        ...prev,
        addInput: '',
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 수정

  const [editCategoryName, setEditCategoryName] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const handleEditClick = (id: string) => {
    const category = data.find((item) => item._id === id);
    if (category) {
      setIsEditing(id);
      setEditCategoryName(category.categoryName);
    }
  };

  const handleSaveClick = (id: string) => {
    setIsEditing(null);
  };

  //삭제
  const deleteHandleClick = async (id: string) => {
    try {
      const res = await axios.delete(URL + `/${id}`);
      console.log(res.data);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Container>
        <Title>카테고리 추가</Title>
        <Input
          type="text"
          placeholder="카테고리를 입력해주세요."
          value={addInput}
          name="addInput"
          onChange={(e) => handleChange(e, '')}
        />
        <Button onClick={() => addHandleClick()}>추가</Button>
      </Container>
      <Container>
        <Title>카테고리 내역</Title>
        {data.map((item: Category) => (
          <EditContent key={item._id}>
            {isEditing === item._id ? (
              <input
                value={editCategoryName}
                name="editInput"
                onChange={(e) => handleChange(e, item._id)}
                autoFocus
              />
            ) : (
              <p>{item.categoryName}</p>
            )}
            <div>
              {isEditing === item._id ? (
                <Button onClick={() => handleSaveClick(item._id)}>저장</Button>
              ) : (
                <Button onClick={() => handleEditClick(item._id)}>수정</Button>
              )}
              <Button onClick={() => deleteHandleClick(item._id)}>삭제</Button>
            </div>
          </EditContent>
        ))}
      </Container>
    </div>
  );
};

export default AdminInfoCategory;

const Container = styled.div`
  padding: 5rem 6rem;
  border-bottom: 2px solid #e0e0e0;
`;
const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 4rem;
  font-weight: 600;
`;
const Input = styled.input`
  margin 0 4rem;
  padding: 1.2rem;
  width: 60rem;
  font-size: 2rem;
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 15px;
  outline: none;
`;

const EditContent = styled.div`
  margin-left: 5rem;
  display: flex;
  flex-direction: row;
  margin-bottom: 1.4rem;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  width: 82rem;
  input {
    margin-left: 3.8rem;
    border: 0;
    outline: none;
    font-weight: 500;
    font-size: 2.2rem;
  }
  p {
    margin-left: 4rem;
    font-size: 2.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  div {
    margin-right: 4rem;
  }
  button {
    margin: 1rem;
  }
`;
const Button = styled.button`
  width: 9rem;
  height: 4.4rem;
  background: #000080;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.8rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 128, 0.8);
  }
  &:active {
    background: rgba(0, 0, 128, 0.6);
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
