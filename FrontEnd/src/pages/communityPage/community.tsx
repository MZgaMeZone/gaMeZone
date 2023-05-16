import React from "react";
import { useNavigate, NavLink  } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';

import NoticeComponent from "../../components/Boards/NoticeComponent";

const Community = () => {
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
          <NoticeComponent />
        </CommunityBody>
      </CommunityContainer>
    </CommunitySection>
  )
};

export default Community;

const CommunitySection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background--gray);
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
