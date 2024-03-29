import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { get } from '../../api/api';
import CommentComponent from '../Comments/CommentComponent';
import DeletePost from './DeletePostComponent';
import UserDataType from '../../types/userType';
import { CategoryType, PostType } from '../../types/communityType';
import { dateFormatter } from '../../utils/dateUtil';

import exitImg from '../../style/icons/x-solid.svg';

const apiURL = process.env.REACT_APP_API_URL;

const PostPage = ({ boardcategory }: CategoryType) => {
  const userToken: string | null = localStorage.getItem('userToken');
  const [post, setPost] = useState<PostType | null>(null); // post 상태를 null로 초기화
  const [userEmail, setUserEmail] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const { postId } = useParams<{ postId: string }>(); // postId를 string으로 받아옴
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) return;
    const fetchData = async () => {
      const responseData = await get<UserDataType>('/api/users');
      setUserEmail(responseData.data.email);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await get<PostType>(`/api/posts/post/${postId}`);
      setPost(responseData.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (post !== null && post !== undefined) {
      setCategory(post.category);
    }
  }, [post]);

  if (!post || !postId) {
    // postId에 해당하는 데이터가 없을 경우에 대한 처리
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const clickHandler = () => {
    navigate(`/community/${postId}/modified`);
  };

  const exitHandler = () => {
    navigate('/');
  };

  return (
    <CommunitySection>
      <CommunityContainer>
        <CommunityHeader>
          커뮤니티
          <ExitButton onClick={exitHandler}>
            <ExitImage src={exitImg} alt="exitImg" />
          </ExitButton>
        </CommunityHeader>
        <CommunityBody>
          <Header>
            <CommunityTitle>MZ 오락실</CommunityTitle>
            {boardcategory === 'freeboard' ? (
              <>
                <CurrentLink to="/community">자유게시판</CurrentLink>
                <CommunityLink to="/community/certified">
                  인증게시판
                </CommunityLink>
              </>
            ) : (
              <>
                <CommunityLink to="/community">자유게시판</CommunityLink>
                <CurrentLink to="/community/certified">인증게시판</CurrentLink>
              </>
            )}
          </Header>
          <Body>
            <TitleContainer>
              <Title>{post.title}</Title>
              <AuthorContainer>
                <Author>{post.author.nickname}</Author>
                <Date>
                  {dateFormatter(post.createdAt, 'YYYY-MM-DD HH:mm:ss')}
                </Date>
              </AuthorContainer>
            </TitleContainer>
            <ScrollContainer>
              <Post>
                {userEmail === post.author.email && (
                  <ButtonContainer>
                    <ModifiedButton onClick={clickHandler}>
                      수정하기
                    </ModifiedButton>
                    <DeletePost postId={postId} boardcategory={boardcategory} />
                  </ButtonContainer>
                )}
                <MainText>
                  {post.image && (
                    <CertImage src={`${apiURL}/${post.image}`} alt="인증사진" />
                  )}
                  {post.content
                    ? post.content.split('\n').map((item, index) => {
                        return <Text key={index}>{item}</Text>;
                      })
                    : ''}
                </MainText>
              </Post>
            </ScrollContainer>
            <CommentComponent postId={postId} category={category} />
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

const ScrollContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  border-bottom: 1px solid var(--background--gray);
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-clip: padding-box;
    border: 3px solid #ebeded;
    background: silver;
    box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
      inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  }
  &::-webkit-scrollbar-track {
    background: #ebeded;
  }
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  height: 31rem;
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

const MainText = styled.div`
  display: flex;
  margin: 2rem 0 1rem;
  font-size: 2rem;
`;

const Text = styled.p`
  margin-bottom: 0.4rem;
`;

const CertImage = styled.img`
  width: 40%;
  margin-right: 10rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: end;
  margin-top: 1rem;
`;

const ModifiedButton = styled.button`
  margin: 0;
  height: 3rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;
