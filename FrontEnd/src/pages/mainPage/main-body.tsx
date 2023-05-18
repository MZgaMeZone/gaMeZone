import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import styles from "../../../src/style/admin.module.css";

type MainBodyProps = {
  mainModal: boolean;
  setMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// get요청으로 모든 category를 불러온 결과값
const dummyCategory = [
  "어드벤쳐",
  "아케이드",
  "전략",
  "대전",
  "RPG",
  "신작",
  "인기작",
];

// 각각의 category를 누르면 다시 get요청을 보내어 해당 category로 게임목록을 검색한 결과값
const dummyFindByCategory = [
  {
    name: "10초게임",
    url: "game1",
    img: require("../../images/gomao.png"),
    _id: "asdfasdf",
  },
  {
    name: "업다운게임",
    url: "game2",
    img: require("../../images/cute.png"),
    _id: "asdfasdf",
  },
  {
    name: "베스킨라빈스31",
    url: "game1",
    img: require("../../images/gomao.png"),
    _id: "asdfasdf",
  },
];

function MainBody(props: MainBodyProps) {
  const mainModal = props.mainModal;
  const [categoryModal, setCategoryModal] = React.useState<boolean>(false);
  const navigate = useNavigate();
  function handleGameClick(itemId: string) {
    navigate(`/game/${itemId}`);
  }
  return (
    <>
      <button
        style={{ margin: 80 }}
        onClick={() => {
          setCategoryModal(false);
        }}
      >
        종료버튼 임시
      </button>
      <MainContainer>
        {mainModal && (
          <>
            <CategoryBox>
              <CategoryLeftLine>MZ 오락실</CategoryLeftLine>
              <div>
                <ul>
                  {dummyCategory &&
                    dummyCategory.map((item, index) => (
                      <CategoryButton
                        key={index}
                        onClick={() => setCategoryModal(true)}
                      >
                        {item}
                      </CategoryButton>
                    ))}
                </ul>
              </div>
            </CategoryBox>
          </>
        )}
      </MainContainer>
      {categoryModal && (
        <CategoryContainer>
          <div className={styles.container}>
            <header>
              <div>ㅇㅇ</div>
              <p>카테고리명</p>
            </header>
            <main>
              <div className={styles.content}>
                <ul>
                  {dummyFindByCategory &&
                    dummyFindByCategory.map((item, index) => (
                      <button
                        key={index}
                        style={{
                          margin: "3rem",
                          width: "20rem",
                          height: "20rem",
                          fontSize: "2.5rem",
                        }}
                        onClick={() => handleGameClick(item.url)}
                      >
                        <GameImage src={item.img} alt={item.name} />
                        {item.name}
                      </button>
                    ))}
                </ul>
              </div>
            </main>
            <footer>
              <div></div>
            </footer>
          </div>
        </CategoryContainer>
      )}
    </>
  );
}
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
const CategoryButton = styled.button`
  display: flex;
  width: 30rem;
  height: 5rem;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border: 1px solid grey;
  background-color: #d9d9d9;
  &:hover {
    background-color: rgb(184, 184, 184);
    cursor: pointer;
  }
`;

const CategoryContainer = styled.div`
  background-color: skyblue;
  display: flex;
  position: absolute;
  align-items: center;
  width: 10rem;
  height: 5rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const GameImage = styled.img`
  width: 100%;
  height: auto;
`;
