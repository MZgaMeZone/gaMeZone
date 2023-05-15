import React from "react";
import { useNavigate, NavLink  } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';

const Community = () => {
  return (
    <CommunitySection>
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
          <LabelContainer>
            <Label>글 번호</Label>
            <Label>제목</Label>
            <Label>작성자</Label>
            <Label>작성일</Label>
          </LabelContainer>
        </Body>
      </CommunityBody>
    </CommunitySection>
  )
};

export default Community;

const CommunitySection = styled.div`
  background-color: #C0C0C0;
`

const CommunityHeader = styled.div`
  margin: 1rem;
  padding: 1rem;
  background: linear-gradient(90deg, #000080, #1782E4);
  color: white;
  font-size: 1.5rem;
`

const CommunityBody = styled.div`
  margin: 1rem;
  background-color: white;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;
  border-bottom: 2px solid black;
`

const CommunityTitle = styled.h2`
  margin-right: 2rem;
  font-size: 2rem;
`

const CurrentLink = styled(NavLink)`
  margin: auto 4rem;
  padding-top: 0.6rem;
  font-size: 1.4rem;

  text-decoration: none;
  color: blue;
`

const CommunityLink = styled(NavLink)`
  margin: auto 4rem;
  padding-top: 0.6rem;
  font-size: 1.4rem;

  text-decoration: none;
  color: black;
`

const Body = styled.div`
  display: flex;
`

const LabelContainer = styled.div`
  display: flex;
  margin-bottom: 10rem;
`

const Label = styled.p`
  margin: 0rem 13rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`