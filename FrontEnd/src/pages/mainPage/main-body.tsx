import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import styles from '../../../src/style/admin.module.css';
import exitImg from '../../style/icons/x-solid.svg';
import axios from 'axios';
import { stringify } from 'querystring';
type MainBodyProps = {
  mainModal: boolean;
  setMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function MainBody(props: MainBodyProps) {
  const mainModal = props.mainModal;
  const [categoryModal, setCategoryModal] = React.useState<boolean>(false);
  const [categoryList, setCategoryList] = React.useState<any[]>([]);
  const [gameList, setGameList] = React.useState<any[]>([]);

  // 시작버튼을 누를 때 리스트를 뽑아오는 함수
  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/categories` // 됨!
      )
      .then((res) => {
        const categoryData = res.data;
        setCategoryList(categoryData);
      })
      .catch((error) => {
        console.error('카테고리 데이터 요청 실패:', error);
      });
  }, []);

  // 카테고리 버튼을 눌러 게임 목록을 불러오는 함수
  async function fetchGameList(item: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/games/categories/${item}` // 됨!
      );
      const gameData = response.data;
      console.log(gameData);
      setGameList(gameData);
    } catch (error) {
      console.error('게임 목록 요청 실패:', error);
    }
  }

  // 각 게임 페이지로 이동하는 기능
  const navigate = useNavigate();
  function handleGameClick(itemId: string) {
    navigate(`/game/${itemId}`);
  }
  return (
    <>
      <MainContainer>
        {mainModal && (
          <>
            <CategoryBox>
              <CategoryLeftLine>MZ 오락실</CategoryLeftLine>
              <div>
                <ul>
                  {categoryList &&
                    categoryList.map((item) => (
                      <CategoryButton
                        key={item._id}
                        onClick={() => {
                          setCategoryModal(true);
                          fetchGameList(item.categoryName);
                        }}
                      >
                        {item.categoryName}
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
            <CategoryHeader>
              <CategoryTitle>카테고리명</CategoryTitle>
              <CategoryHeaderButton
                onClick={() => {
                  setCategoryModal(false);
                }}
              >
                <img
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                  src={exitImg}
                  alt="exitImg"
                />
              </CategoryHeaderButton>
            </CategoryHeader>
            <main>
              <div
                className={styles.content}
                style={{
                  // backgroundColor: 'beige',
                  display: 'flex',
                  height: '100%',
                }}
              >
                <ul>
                  {gameList &&
                    gameList.map((item) => (
                      <GameButton
                        key={item._id}
                        onClick={() => handleGameClick(item.gameUrl)}
                        imageUrl={
                          process.env.REACT_APP_API_URL + item.gameImageUrl
                        }
                        gameTitle={item.gameTitle}
                      ></GameButton>
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
  font-size: 2.8rem;
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

// const GameImage = styled.img`
//   width: 100%;
//   height: auto;
// `;

const GameButton = ({ onClick, imageUrl, gameTitle }: any) => {
  return (
    <button
      style={{
        margin: '3rem',
        width: '20rem',
        height: '20rem',
        fontSize: '2.5rem',
      }}
      onClick={onClick}
    >
      <img src={imageUrl} />
      <div>{gameTitle}</div>
    </button>
  );
};

const CategoryHeader = styled.div`
  height: 4.2rem;
  display: flex;
  padding-left: 1.5rem;
  position: relative;
  background: #000080;
`;

const CategoryTitle = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-size: 2rem;
  justify-content: flex-start;
`;

const CategoryHeaderButton = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  width: 3rem;
  height: 3rem;
`;
