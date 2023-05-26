import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import exitImg from '../../../style/icons/x-solid.svg';

type CommunityContainer = {
  children: ReactNode;
};

function CommunityContainer({ children }: CommunityContainer) {
  const [exit, setIsExit] = useState(false);
  const navigate = useNavigate();
  const handleExit = () => {
    navigate('/mypage');
  };
  return (
    <>
      <Container_Box style={{ display: exit ? 'none' : 'block' }}>
        <Header_Bar>
          <div className="title">
            <Link to="/mypage">
              <p>마이페이지</p>
            </Link>
          </div>
          <Exit_Button onClick={handleExit}>
            <img src={exitImg} alt="exitImg" />
          </Exit_Button>
        </Header_Bar>
        {children}
      </Container_Box>
    </>
  );
}

const Container_Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 128rem;
  height: 72rem;
  border-radius: 3px;
  background-color: var(--background--gray);
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
`;

const Header_Bar = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  background-color: var(--color--header);
  .title > a > p {
    font-size: 2rem;
    color: white;
  }
`;

const Exit_Button = styled.button`
  width: 3.8rem;
  height: 3.8rem;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;
  &:active {
    box-shadow: inset 0.3rem 0.3rem 0.3rem 0rem #000000;
  }
`;

export default CommunityContainer;
