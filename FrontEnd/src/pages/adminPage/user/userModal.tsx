import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  const handleDeleteClick = () => {};

  return (
    <ModalContainer>
      <Header>
        <Close onClick={onClose}>&times;</Close>
      </Header>
      <button onClick={handleDeleteClick}>탈퇴</button>
    </ModalContainer>
  );
};

export default UserModal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80rem;
  height: auto;
  background: #c0c0c0;
  border-radius: 5px;
  border: 2px solid #4a4d4d;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
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
