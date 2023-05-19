import React from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import PostData from './PostData';
import { NavLink  } from 'react-router-dom';
import styled from 'styled-components';

import CommentComponent from './CommentComponent';

const PostPage = () => {
  const { postId } = useParams(); 
  const post = PostData.find((item) => item._id === postId); 

  if (!post) {
    // postId에 해당하는 데이터가 없을 경우에 대한 처리
    return <div>게시물을 찾을 수 없습니다.</div>;
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
                  <Date>{post.author}</Date>
                  <Author>{moment(post.createdAt).format('YYYY-MM-DD')}</Author>
                </AuthorContainer>
              </TitleContainer>
              <MainText>{post.mainText}</MainText>
            </Post>
            <CommentComponent comments={post.comments || []} postId={postId}/>
          </Body>
        </CommunityBody>
      </CommunityContainer>
    </CommunitySection>
  )
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
`

const CommunityContainer = styled.div`
  background-color: var(--background--gray);
  padding: 0.5rem 0;
`

const CommunityHeader = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: var(--color--header);
  color: white;
  font-size: 2rem;
`

const CommunityBody = styled.div`
  margin: 1rem;
  background-color: white;
`

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 2rem 2rem 2rem;
  border-bottom: 2px solid black;
`

const CommunityTitle = styled.h2`
  margin: 2rem;
  font-size: 2.5rem;
`

const CurrentLink = styled(NavLink)`
  margin: auto 4rem;
  padding-top: 0.6rem;
  font-size: 2rem;

  text-decoration: none;
  color: blue;
`

const CommunityLink = styled(NavLink)`
  margin: auto 4rem;
  padding-top: 0.6rem;
  font-size: 2rem;

  text-decoration: none;
  color: black;
`

const Body = styled.div`
  height: 53rem;
  margin: 0 3rem;
`

const Post = styled.div`
  display: flex;
  flex-direction: column;
  height: 37rem;
  border-bottom: 1px solid var(--background--gray);
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--background--gray);
`
const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  margin-top: 0;
  font-size: 3rem;
`

const Date = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.7rem;
`

const Author = styled.p`
  font-size: 1.3rem ;
`

const MainText = styled.p`
  margin: 2rem 0 1rem;
  font-size: 2rem;
`

const BackLink = styled(Link)`
  margin: 30rem 3rem auto auto;
  align-self: end;
  font-size: 2rem;

  &:hover {
    color: red;
  }
`