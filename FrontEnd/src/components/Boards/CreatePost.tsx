import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { get, post } from '../../api/api';
import UserDataType from '../../types/userType';
import { CategoryType } from '../../types/communityType';

import exitImg from '../../style/icons/x-solid.svg';

const CreatePost = ({ boardcategory }: CategoryType) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await get<UserDataType>('/api/users');
      setUserEmail(responseData.data.email);
    };
    fetchData();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const formData = new FormData();
      formData.append('author', userEmail);
      formData.append('title', title);
      formData.append('content', content);
      formData.append(
        'category',
        boardcategory === 'freeboard' ? 'free' : boardcategory
      );
      if (file) {
        formData.append('img', file);
      }

      await post('/api/posts', formData);

      alert('게시물이 작성되었습니다.');
      if (boardcategory === 'freeboard') {
        navigate('/community');
      } else {
        navigate('/community/certified');
      }
    } catch (error) {
      console.error(error);
      alert('게시물 작성 중 오류가 발생했습니다.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const clickHandler = () => {
    navigate('/');
  };

  return (
    <PostSection>
      <PostHeader>
        게시물 작성
        <ExitButton onClick={clickHandler}>
          <ExitImage src={exitImg} alt="exitImg" />
        </ExitButton>
      </PostHeader>
      <PostForm onSubmit={handleFormSubmit}>
        <TitleForm>
          <TitleLabel>제목</TitleLabel>
          <TitleInput type="text" value={title} onChange={handleTitleChange} />
        </TitleForm>
        <MainForm>
          <MainLabel>내용</MainLabel>
          <MainInput value={content} onChange={handleContentChange} />
        </MainForm>
        {boardcategory === 'cert' && (
          <ImageInput
            type="file"
            onChange={handleImageChange}
            name="img"
            accept="image/*"
          />
        )}
        <PostFooter>
          <GoBack to="/community" boardcategory={boardcategory}>
            뒤로 가기
          </GoBack>
          <PostButton type="submit" boardcategory={boardcategory}>
            작성 완료
          </PostButton>
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
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;
  background-color: var(--color--header);
  color: white;
  font-size: 2.6rem;
`;
const ExitButton = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: 0.7rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;
`;

const ExitImage = styled.img`
  width: 65%;
  height: 65%;
  display: flex;
  margin: 0.6rem auto;
  padding-bottom: 0.3rem;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  background-color: white;
`;

const TitleForm = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
`;

const TitleLabel = styled.p`
  margin-right: 3rem;
  font-size: 2rem;
`;

const TitleInput = styled.input`
  width: 50.6rem;
  height: 4rem;
  font-size: 2rem;
  border: 1px solid black;
`;

const MainForm = styled.div`
  padding-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const MainLabel = styled.p`
  margin-right: 3rem;
  font-size: 2rem;
`;

const MainInput = styled.textarea`
  width: 50rem;
  height: 44rem;
  font-size: 2rem;
  border: 1px solid black;
`;

const ImageInput = styled.input`
  align-self: end;
`;

const PostFooter = styled.div`
  display: flex;
  width: 120rem;
  justify-content: space-between;
  align-items: end;
`;

const PostButton = styled.button<CategoryType>`
  margin: ${(props) =>
    props.boardcategory === 'cert' ? '2rem 0 1rem' : '4rem 0 1rem'};
  word-wrap: normal;
  height: 2.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  font-size: 1.5rem;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

const GoBack = styled(Link)<CategoryType>`
  margin: ${(props) =>
    props.boardcategory === 'cert' ? '2rem 0 1rem' : '4rem 0 1rem'};
  padding: 1rem;
  font-size: 1.6rem;

  &:hover {
    color: blue;
  }
`;
