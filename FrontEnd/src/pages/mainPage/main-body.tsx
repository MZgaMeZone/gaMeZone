import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

type MainBodyProps = {
  mainModal: boolean;
  setMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const dummyCategory = [
  "어드벤쳐",
  "아케이드",
  "전략",
  "대전",
  "RPG",
  "ㅈㄴ재미있는게임",
  "신작",
  "인기작",
];

const MainBody = (props: MainBodyProps) => {
  const mainModal = props.mainModal;

  return (
    <>
      <MainContainer>
        {mainModal && (
          <>
            <CategoryBox>
              <CategoryLeftLine>MZ 오락실</CategoryLeftLine>
              <div>
                <ul>
                  {dummyCategory &&
                    dummyCategory.map((item, index) => (
                      <CategoryName key={index}>{item}</CategoryName>
                    ))}
                </ul>
              </div>
            </CategoryBox>
          </>
        )}
      </MainContainer>
    </>
  );
};
export default MainBody;

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

const CategoryLeftLine = styled.div`
  background-color: #a4a4a4;
  display: flex;
  align-items: end;
  justify-content: end;
`;

const CategoryBox = styled.ul`
  width: fit-content;
  height: fit-content;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flexbox;
  flex-direction: row;
  margin: 5rem 0rem;
  border: 3px solid;
  list-style-type: none;
`;

// 어드벤처, 아케이드, 전략, 대전 텍스트 박스 (나중에 버튼으로 바꿔야함)
const CategoryName = styled.button`
  display: flex;
  width: 30rem;
  height: 5rem;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border: 1px solid grey;
  background-color: #d9d9d9;
`;
