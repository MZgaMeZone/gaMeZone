import styled from 'styled-components';

import CommunityContainer from './components/communityContainer';
import PostList from './components/postList';

function MyArticle() {
  return (
    <>
      <CommunityContainer>
        <Title>내가 쓴 글</Title>
        <Line></Line>
        <PostList />
      </CommunityContainer>
    </>
  );
}

const Line = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-left: 6.3rem;
  margin-top: 3rem;
`;

export default MyArticle;
