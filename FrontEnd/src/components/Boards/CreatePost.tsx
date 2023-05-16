import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e:any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e:any) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = async (e:any) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }

    if (content.trim() === '') {
      alert('내용을 입력해주세요');
      return;
    }

    try {

      const postData = {
        title: title,
        content: content,
      };

      localStorage.setItem('postData', JSON.stringify(postData));

      alert('게시물이 작성되었습니다.');
      navigate('/community');
    } catch (error) {
      console.error(error);
      alert('게시물 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <PostSection>
      <PostHeader>게시물 작성</PostHeader>
      <PostForm onSubmit={handleFormSubmit}>
        <TitleForm>
          <TitleLabel>제목</TitleLabel>
          <TitleInput type="text" value={title} onChange={handleTitleChange} />
        </TitleForm>
        <MainForm>
          <MainLabel>내용</MainLabel>
          <MainInput value={content} onChange={handleContentChange} />
        </MainForm>
        <PostButton type="submit">작성 완료</PostButton>
        <GoBackForm>
        <Link to="/community">뒤로 가기</Link>
      </GoBackForm>
      </PostForm>
      
    </PostSection>
  );
};

export default CreatePost;

const PostSection = styled.div`
  background-color: var(--background--gray);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 128rem;
  height: 72rem;
  padding: 0.5rem 0;
`

const PostHeader = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: var(--color--header);
  color: white;
  font-size: 2rem;
`

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  background-color: white;
  
`

const TitleForm = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
`

const TitleLabel = styled.p`
  margin-right: 3rem;
  font-size: 2rem;
`

const TitleInput = styled.input`
  width: 50rem;
  height: 4rem;
  font-size: 2rem;
  border: 1px solid black;
`

const MainForm = styled.div`
  padding-bottom: 1.5rem;
  display: flex;
  align-items: center;
`

const MainLabel = styled.p`
  margin-right: 3rem;
  font-size: 2rem;
`

const MainInput = styled.textarea`
  width: 50rem;
  height: 46rem;
  font-size: 2rem;
  border: 1px solid black;
`

const PostButton = styled.button`
  align-self: end;
  margin: 0 3rem 2rem;
  height: 3rem;
  background-color: var(--background--gray);
  border: none;
  font-size: 1.5rem;
  border-radius: 4px;
  cursor: pointer;
`

const GoBackForm = styled.div`
  align-self: start;
  padding: 1rem;
  font-size: 1.5rem;
`