import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../src/style/admin.module.css';
import exitImg from '../../style/icons/x-solid.svg';
import axios from 'axios';
import {
  MainBodyProps,
  CategoryType,
  GameListType,
} from '../../types/mainType';
import {
  MainContainer,
  CategoryLeftLine,
  CategoryBox,
  CategoryButton,
  CategoryContainer,
  CategoryHeader,
  CategoryTitle,
  CategoryHeaderButton,
} from './mainStyle';

function MainBody(props: MainBodyProps) {
  const mainModal = props.mainModal;
  const [categoryModal, setCategoryModal] = React.useState<boolean>(false);
  const [categoryList, setCategoryList] = React.useState<CategoryType[]>([]);
  const [gameList, setGameList] = React.useState<GameListType[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [countVisitor, setCountVisitor] = React.useState<number>(0);
  // 방문자수 확인
  React.useEffect(() => {
    setCountVisitor(countVisitor + 1);
  }, []);

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
                          setSelectedCategory(item.categoryName);
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
              <CategoryTitle>{selectedCategory}</CategoryTitle>
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

const GameButton = ({ onClick, imageUrl, gameTitle }: any) => {
  return (
    <button
      style={{
        margin: '3rem',
        width: '20rem',
        height: '20rem',
        fontSize: '2.5rem',
        backgroundColor: 'rgb(250, 250, 250)',
      }}
      onClick={onClick}
    >
      <img src={imageUrl} />
      <div>{gameTitle}</div>
    </button>
  );
};
