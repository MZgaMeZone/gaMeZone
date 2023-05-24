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
  width: 40rem;
  height: 50rem;
  background: #ffffff;
  border-radius: 5px;
`;

const ModalContent = styled.div``;
const Header = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  background: #000080;
  border-radius: 5px 5px 0 0;
`;
const Close = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  background: #ffffff;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
