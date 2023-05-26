import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Category } from './interface';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateCategory: (newCategory: string[]) => void;
}
const CategoryModal: React.FC<ModalProps> = ({
  updateCategory,
  isOpen,
  onClose,
}) => {
  //*** 카테고리 옵션 데이터 처리
  //카테고리 데이터를 받아오고 options에 담아준다.
  //체크 박스 옵션
  const [options, setOptions] = useState<Category[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((res) => setOptions(res.data))
      .catch((err) => console.log(err));
  }, []);

  //****체크박스 처리
  //체크한 엘레먼트 담아줄 배열
  const [checkList, setCheckList] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean>(false);

  //클릭시 checkList 배열에 카테고리가 포함되어 있지 않다면 카테고리를 추가하고
  //포함되어있다면 카테고리를 삭제해준다.
  const handleItemCheck = (checked: boolean, value: string) => {
    if (checked) {
      setCheckList((prev) => [...prev, value]);
      return;
    }
    if (!checked && checkList.includes(value)) {
      setCheckList(checkList.filter((i) => i !== value));
      return;
    }
    return;
  };

  //:React.ChangeEvent<HTMLInputElement>이벤트로 인풋 엘레먼트가
  //체크되었는지 여부를 파악 할 수 있다.
  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setChecked(!checked);
    handleItemCheck(e.target.checked, value);
  };

  //버튼을 통해 체크박스 데이터를 보내준다.
  const handleModalClick = () => {
    updateCategory(checkList);
    onClose();
  };

  //false일 경우 모달창 유지
  if (!isOpen) {
    return null;
  }
  //checkBox에 checked는 체크리스트배열에서 전달할 아이템이 포함되어있다면 true를 반환,

  return (
    <ModalContainer>
      <Header>
        <Close onClick={onClose}>&times;</Close>
      </Header>
      <ModalContent>
        {options.map((item) => (
          <div key={item._id}>
            <label>
              <CheckBox
                type="checkbox"
                value={item.categoryName}
                checked={checkList.includes(item.categoryName)}
                onChange={(e) => handleCheck(e, item.categoryName)}
              />
              {item.categoryName}
            </label>
          </div>
        ))}
        <button onClick={handleModalClick}>완료</button>
      </ModalContent>
    </ModalContainer>
  );
};
export default CategoryModal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 2;
  width: 40rem;
  height: auto;
  background: #c0c0c0;
  border-radius: 5px;
  border: 2px solid #4a4d4d;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContent = styled.div`
  margin: 2rem 0.8rem;
  background: #ffffff;
  border-radius: 2px;
  overflow: hidden;
  height: auto;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  label {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
  }

  div {
    display: flex;
    padding: 1rem;
  }
  button {
    display: inline;
    margin-left: auto;
    width: 7rem;
    height: 3.4rem;
    font-size: 1.8rem;
    background: #000080;
    color: #ffffff;
    border-radius: 5px;
    border: 1px solid #000000;
    &:hover {
      background: rgba(0, 0, 128, 0.8);
    }
    &:active {
      background: rgba(0, 0, 128, 0.6);
      box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.4);
    }
  }
`;
const Header = styled.div`
  position: relative;
  width: 100%;
  height: 4rem;
  background: #000080;
`;

const Close = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  background: #c0c0c0;
  border-radius: 1px;
  font-size: 2.2rem;
  font-weight: 600;
  color: #808080;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;
const CheckBox = styled.input`
  margin-right: 1rem; /* 체크박스 오른쪽 간격 조절 */
  transform: scale(1.2); /* 기본 크기 */
`;
