import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

type ModalProps = {
  isOpen: { [key: string]: boolean };
  onClose: () => void;
  id: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
  const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    const container = document.createElement('div');
    container.setAttribute('id', 'modal-container');
    document.body.appendChild(container);
    setModalContainer(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  if (!isOpen[id] || !modalContainer) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <ModalContainer>
          <Header>
            <Close onClick={onClose}>&times;</Close>
          </Header>
          <ModalContent>{/* {children} */}</ModalContent>
        </ModalContainer>,
        modalContainer
      )}
    </>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 2;
  width: 30rem;
  height: 40rem;
  background: #c0c0c0;
  border-radius: 5px;
  border: 2px solid #4a4d4d;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContent = styled.div`
  margin: 2.4rem 0.8rem;
  width: 28rem;
  height: 30rem;
  background: #ffffff;
  border-radius: 2px;
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
