import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";

const CreateComment = ({postId, closeModal}: any) => {
  const nav = useNavigate();
  const [comment, setComment] = useState<string>("");

  const handleContentChange = (e:any) => {
    setComment(e.target.value);
  }

  const clickHandler = async () => {
    if (comment.trim() === '') {
      alert('내용을 입력해주세요');
      return;
    }

    try {
      const commentData = {comment};

      localStorage.setItem('commentData', JSON.stringify(commentData));
      closeModal(true);

      alert("댓글 작성이 완료되었습니다.");
      nav(`/community/${postId}`);
    } catch(err) {
      console.error(err);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  const goBackHandler = () => {
    closeModal(true);
    nav(`/community/${postId}`);
  }

  return (
    <CreateSection>
      <Modal>
        <ModalTitle>댓글 작성</ModalTitle>
        <ModalMain>
          <Main>내용</Main>
          <MainText value={comment} onChange={handleContentChange} />
        </ModalMain>
        <ButtonContainer>
          <CompleteButton onClick={clickHandler}>작성하기</CompleteButton>
          <GoBackButton onClick={goBackHandler}>뒤로가기</GoBackButton>
        </ButtonContainer>
      </Modal>
    </CreateSection>
  )
}

export default CreateComment;

const CreateSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: end;
`

const Modal = styled.div`
  position: absolute;
  width: 125rem;
  height: 20rem;
  margin-bottom: 4rem;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`

const ModalTitle = styled.h3`
  margin-left: 2rem;
`

const ModalMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Main = styled.p`
  margin-right: 3rem;
`

const MainText = styled.textarea`
  width: 100rem;
  height: 7rem;
  font-size: 1.7rem;
`

const ButtonContainer = styled.div`
  margin: 2rem;
  text-align: center;
`
const GoBackButton = styled.button`
  word-wrap: normal;
  margin: 0 3rem 2rem;
  height: 3.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover{
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`
const CompleteButton = styled.button`
  word-wrap: normal;
  margin: 0 3rem 2rem;
  height: 3.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover{
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`