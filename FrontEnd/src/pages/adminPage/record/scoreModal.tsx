import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Score } from './scoreInterface';

type ModalProps = {
  isOpen: { [key: string]: boolean };
  onClose: () => void;
  id: string;
  data?: Score;
};

const ScoreModal: React.FC<ModalProps> = ({ isOpen, onClose, id, data }) => {
  const value = {
    user: data?.userNickname,
    avgScore: data?.averageScore,
    highScore: data?.highScore,
    totalScore: data?.totalScores,
    date: data?.createdAt,
  };
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
  //totalScore 배열당 줄바꿈
  const total = [value.totalScore].map((arr) => arr.join('\n'));

  //date, time 나눔
  const [date, time] = (value.date || '').split('T');
  return (
    <>
      {ReactDOM.createPortal(
        <ModalContainer>
          <Header>
            <Close onClick={onClose}>&times;</Close>
          </Header>
          <ModalContent>
            <div>
              <Title>user:</Title>
              <p>{value.user}</p>
            </div>
            <div>
              <Title>date:</Title>
              <p>{date}</p>
            </div>
            <div>
              <Title>time:</Title>
              <p>{time}</p>
            </div>
            <div>
              <Title>svg:</Title>
              <p>{value.avgScore}</p>
            </div>
            <div>
              <Title>high:</Title>
              <p>{value.highScore}</p>
            </div>
            <div>
              <Title>total:</Title>
              <p>{total}</p>
            </div>
          </ModalContent>
        </ModalContainer>,
        modalContainer
      )}
    </>
  );
};

export default ScoreModal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 2;
  width: 36rem;
  height: 46rem;
  background: #c0c0c0;
  border-radius: 5px;
  border: 2px solid #4a4d4d;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  top: 40%;
  left: 50%;
  transform: translate(-40%, -50%);
`;

const ModalContent = styled.div`
  margin: 2rem 0.8rem;
  background: #ffffff;
  border-radius: 2px;
  overflow: hidden;
  height: 37rem;
  div {
    display: flex;
    padding: 1rem;
  }
  p {
    margin-right: 1rem;
    font-size: 2rem;
    white-space: pre-wrap;
  }
`;
const Title = styled.p`
  color: #424242;
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
