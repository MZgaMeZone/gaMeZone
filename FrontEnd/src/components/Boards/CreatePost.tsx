import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
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
        author: "64653ea8c587b21f36aef42e",
        title: title,
        content: content,
      };

      axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, postData);
      
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
        <PostFooter>
          <GoBack to="/community">뒤로 가기</GoBack>
          <PostButton type="submit">작성 완료</PostButton>
        </PostFooter>
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
  border: 1px solid #000000;
  box-shadow: 3px 3px 4px #1c1c1c;
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
  width: 50.6rem;
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
  height: 44rem;
  font-size: 2rem;
  border: 1px solid black;
`

const PostFooter = styled.div`
  display: flex;
  width: 120rem;
  justify-content: space-between;
  align-items: end;
`

const PostButton = styled.button`
  margin: 4rem 0 1rem;
  word-wrap: normal;
  height: 2.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  font-size: 1.5rem;
  cursor: pointer;

  &:active{
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`

const GoBack = styled(Link)`
  margin: 4rem 0 1rem;
  padding: 1rem;
  font-size: 1.6rem;

  &:hover {
    color: blue;
  }
`