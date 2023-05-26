import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category } from './interface';
interface Input {
  editInput: string;
  addInput: string;
}
const GameCategory = () => {
  const URL: string = `${process.env.REACT_APP_API_URL}/api/categories`;
  const [data, setData] = useState<Category[]>([]);

  // input 처리
  const [inputs, setInputs] = useState<Input>({
    addInput: '',
    editInput: '',
  });

  const { addInput } = inputs;

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
  const hadleAddClick = async () => {
    if (addInput === '') {
      alert('카테고리를 입력해주세요.');
    } else if (addInput.length >= 10) {
      alert('카테고리 이름은 10자 이내로 입력 가능합니다.');
      setInputs((prev) => ({
        ...prev,
        addInput: '',
      }));
    } else {
      try {
        const res = await axios.post(URL, {
          categoryName: addInput,
        });
        setData([...data, res.data]);
        setInputs((prev) => ({
          ...prev,
          addInput: '',
        }));
      } catch (err) {
        console.error(err);
      }
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

  const handleSaveClick = async (id: string) => {
    if (editCategoryName === '') {
      alert('수정할 카테고리를 입력해주세요.');
    } else if (editCategoryName.length >= 10) {
      alert('카테고리 이름은 10자 이내로 입력 가능합니다.');
      setEditCategoryName('');
    } else {
      try {
        const res = await axios.patch(`${URL}/${id}`, {
          categoryName: editCategoryName,
        });
        const updatedCategory = res.data;
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id
              ? { ...item, categoryName: updatedCategory.categoryName }
              : item
          )
        );
        setIsEditing(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  //삭제
  const handleDeleteClick = async (id: string, categoryName: string) => {
    const deleteConfirm = window.confirm(
      `[${categoryName}] 카테고리를 삭제하시겠습니까?`
    );
    if (deleteConfirm) {
      try {
        const res = await axios.delete(`${URL}/${id}`);
        console.log(res.data);
        setData(data.filter((item) => item._id !== id));
      } catch (err) {
        console.error(err);
      }
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
        <Button onClick={() => hadleAddClick()}>추가</Button>
      </Container>
      <Container>
        <Title>카테고리 내역</Title>
        {data.map((item: Category) => (
          <>
            <EditContent key={item._id}>
              {isEditing === item._id ? (
                <input
                  value={editCategoryName}
                  name="editInput"
                  onChange={(e) => handleChange(e, item._id)}
                  placeholder="수정할 카테고리를 입력해주세요."
                  autoFocus
                />
              ) : (
                <p>{item.categoryName}</p>
              )}
              <div>
                {isEditing === item._id ? (
                  <Button onClick={() => handleSaveClick(item._id)}>
                    저장
                  </Button>
                ) : (
                  <Button onClick={() => handleEditClick(item._id)}>
                    수정
                  </Button>
                )}
                <Button
                  onClick={() => handleDeleteClick(item._id, item.categoryName)}
                >
                  삭제
                </Button>
              </div>
            </EditContent>
            <span />
          </>
        ))}
      </Container>
    </div>
  );
};

export default GameCategory;

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
  margin: 0 4rem;
  padding: 1.2rem;
  width: 60rem;
  font-size: 2rem;
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 15px;
  outline: none;
`;

const EditContent = styled.div`
  margin: 0 0 1.4rem 5rem;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e0e0e0;
  justify-content: space-between;
  width: 80rem;
  input {
    height: 4.2rem;
    width: 45rem;
    margin: 1.2rem 0 0 2rem;
    padding-left: 1.2rem;
    background-color: rgb(233, 233, 233);
    border: 0;
    border-radius: 15px;
    font-weight: 500;
    font-size: 2.2rem;
  }
  p {
    margin-left: 3rem;
    font-size: 2.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  div {
    margin-right: 3rem;
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
