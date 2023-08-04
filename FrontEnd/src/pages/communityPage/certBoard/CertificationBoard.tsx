import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import NoticeComponent from '../../../components/Boards/NoticeComponent';
import exitImg from '../../../style/icons/x-solid.svg';

const CertifyBoard = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/');
  };

  return (
    <CommunitySection>
      <CommunityContainer>
        <CommunityHeader>
          커뮤니티
          <ExitButton onClick={clickHandler}>
            <ExitImage src={exitImg} alt="exitImg" />
          </ExitButton>
        </CommunityHeader>
        <CommunityBody>
          <Header>
            <CommunityTitle>MZ 오락실</CommunityTitle>
            <CommunityLink to="/community">자유게시판</CommunityLink>
            <CurrentLink to="/community/certified">인증게시판</CurrentLink>
          </Header>
          <NoticeComponent boardcategory="cert" />
        </CommunityBody>
      </CommunityContainer>
    </CommunitySection>
  );
};

export default CertifyBoard;

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
