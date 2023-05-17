import styled from "styled-components";
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <>
      <Container_Box>
        <Header_Bar>
          <div className="title">
            <p>마이페이지</p>
          </div>
          <div className="close_button">
            <button className="close_btn">x</button>
          </div>
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
  width: 76.8rem;
  border-radius: 3px;
  background-color: var(--background--gray);
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
`;

const Header_Bar = styled.div`
  display: flex;
  padding: 0.7rem;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: var(--color--header);
  color: white;
`;
export default Container;
