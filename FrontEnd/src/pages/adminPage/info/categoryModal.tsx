import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Category } from './interface';
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CategoryModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [options, setOptions] = useState<Category[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((res) => setOptions(res.data))
      .catch((err) => console.log(err));
  }, []);
  const [checked, setChecked] = useState(false);

  if (!isOpen) {
    return null;
  }
  return (
    <ModalContainer>
      <Header>
        <Close onClick={onClose}>&times;</Close>
      </Header>
      <ModalContent>
        {options.map((item) => (
          <div key={item._id}>
            <input type="checkbox" />
            <label>{item.categoryName}</label>
          </div>
        ))}
      </ModalContent>
    </ModalContainer>
  );
};
export default CategoryModal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 2;
  width: 46rem;
  height: auto;
  background: #c0c0c0;
  border-radius: 5px;
  border: 2px solid #4a4d4d;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  top: 40%;
  left: 50%;
  transform: translate(-40%, -50%);
`;

const ModalContent = styled.div`
  display: relative;
  margin: 2rem 0.8rem;
  background: #ffffff;
  border-radius: 2px;
  overflow: hidden;
  /* height: 27rem; */
  height: auto;
  lable {
    width: auto;
    height: 1rem;
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
  margin-right: 0.5rem; /* 체크박스 오른쪽 간격 조절 */
  transform: scale(0.5); /* 기본 크기 */
`;
