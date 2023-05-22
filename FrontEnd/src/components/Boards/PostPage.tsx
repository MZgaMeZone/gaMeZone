import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import CommentComponent from '../Comments/CommentComponent';
import DeletePost from './DeletePostComponent';

interface postsType {
  _id: string;
  title: string;
  content: string;
  author: { nickname: string };
  createdAt: string;
}

const PostPage = () => {
  const [post, setPost] = useState<postsType | null>(null); // post 상태를 null로 초기화
  const { postId } = useParams<{ postId: string }>(); // postId를 string으로 받아옴
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/api/posts/post/${postId}`)
    .then((res) => {
      const data = res.data;
      setPost(data);
    });
  }, []);

  // console.log(post);

  // const post: any = PostData.find((item) => item._id === postId);

  if (!post) {
    // postId에 해당하는 데이터가 없을 경우에 대한 처리
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const clickHandler = () => {
    navigate(`/community/${postId}/modified`);
  }

  return (
    <CommunitySection>
      <CommunityContainer>
        <CommunityHeader>커뮤니티</CommunityHeader>
        <CommunityBody>
          <Header>
            <CommunityTitle>MZ 오락실</CommunityTitle>
            <CurrentLink to="/community">자유게시판</CurrentLink>
            <CommunityLink to="/">노하우</CommunityLink>
            <CommunityLink to="/">인증게시판</CommunityLink>
            <CommunityLink to="/">건의</CommunityLink>
          </Header>
          <Body>
            <Post>
              <TitleContainer>
                <Title>{post.title}</Title>
                <AuthorContainer>
                  <Author>{post.author.nickname}</Author>
                  <Date>{moment(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Date>
                </AuthorContainer>
              </TitleContainer>
              <ButtonContainer>
                <ModifiedButton onClick={clickHandler}>수정하기</ModifiedButton>
                <DeletePost postId={postId}/>
              </ButtonContainer>
              <MainText>{post.content.split("\n").map((item) => {
                return <Text>{item}</Text>
              })}</MainText>
              
            </Post>
            <CommentComponent postId={postId} />
          </Body>
        </CommunityBody>
      </CommunityContainer>
    </CommunitySection>
  );
};

export default PostPage;

const CommunitySection = styled.div`
  background-color: var(--background--gray);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background--gray);
  border: 1px solid #000000;
  box-shadow: 3px 3px 4px #1c1c1c;
  width: 128rem;
  height: 72rem;
`;

const CommunityContainer = styled.div`
  background-color: var(--background--gray);
  padding: 0.5rem 0;
`;

const CommunityHeader = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: var(--color--header);
  color: white;
  font-size: 2rem;
`;

const CommunityBody = styled.div`
  margin: 1rem;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 2rem 2rem 2rem;
  border-bottom: 2px solid black;
`;

const CommunityTitle = styled.h2`
  margin: 2rem;
  font-size: 2.5rem;
`;

const CurrentLink = styled(NavLink)`
  margin: auto 4rem;
  padding-top: 0.6rem;
  font-size: 2rem;

  text-decoration: none;
  color: blue;
`;

const CommunityLink = styled(NavLink)`
  margin: auto 4rem;
  padding-top: 0.6rem;
  font-size: 2rem;

  text-decoration: none;
  color: black;
`;

const Body = styled.div`
  height: 53rem;
  margin: 0 3rem;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  height: 37rem;
  border-bottom: 1px solid var(--background--gray);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--background--gray);
`;
const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 3rem;
`;

const Date = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.4em;
`;

const Author = styled.p`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
`;

const MainText = styled.p`
  margin: 2rem 0 1rem;
  font-size: 2rem;
`;

const Text = styled.p`
  margin-bottom: 0.4rem;
`

const ButtonContainer = styled.div`
  display: flex;
  align-self: end;
  margin-top: 1rem;
`

const ModifiedButton   = styled.button`
  margin: 0;
  height: 3rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`
