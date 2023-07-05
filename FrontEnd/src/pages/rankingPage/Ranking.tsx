import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import starIcon from '../../style/icons/star.svg';
import crownIcon from '../../style/icons/crown.svg';
import heartIcon from '../../style/icons/heart.svg';
import dropdownIcon from '../../style/icons/dropdown.svg';
import Top3Box from '../../components/Honors/Top3Box';
import AllHonorsBox from '../../components/Honors/AllHonorsBox';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import { GameListType } from '../../types/mainType';
import { RankingDataType } from '../../types/gameType';
import ContainerHeader from '../../components/Common/ContainerHeader';

const Ranking = () => {
  const [showGameList, setShowGameList] = useState(false);
  const [gameList, setGameList] = useState<GameListType[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameListType>({
    _id: '',
    gameCategory: [''],
    gameDescription: '',
    gameImageUrl: '',
    gameManual: '',
    gameOption: '',
    gameServiceStatus: '',
    gameTitle: '전체 랭킹',
    gameUrl: '',
  });
  const [rankingData, setRankingData] = useState<RankingDataType[]>([]);
  const [mainModal, setMainModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/games/`)
      .then((res) => {
        setGameList(() => [
          {
            gameTitle: '전체 랭킹',
          },
          ...res.data,
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  //선택한 게임의 랭킹데이터 저장
  useEffect(() => {
    //전체 랭킹 요청
    if (!selectedGame || selectedGame.gameTitle === '전체 랭킹') {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/scores/honors`)
        .then((res) => {
          setRankingData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      //선택된 게임 요청
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/scores/${selectedGame.gameUrl}/${selectedGame.gameOption}/honors/?num=20`
        )
        .then((res) => {
          setRankingData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedGame]);

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <RankingContainer>
        <ContainerHeader
          favicon={starIcon}
          title="명예의 전당"
          onClick={() => {
            navigate(-1);
          }}
        />
        <ContainerBody>
          <Nav>
            <SelectGameDiv
              onClick={() => {
                setShowGameList(!showGameList);
              }}
            >
              <p>{selectedGame && selectedGame.gameTitle}</p>

              <DropDownIcon src={dropdownIcon} alt="dropdownIcon" />
            </SelectGameDiv>

            {showGameList && (
              <SelectGameList>
                {gameList &&
                  gameList.map((data) => (
                    <li
                      key={data.gameTitle}
                      onClick={() => {
                        setSelectedGame(data);
                        setShowGameList(!showGameList);
                      }}
                    >
                      {data.gameTitle}
                    </li>
                  ))}
              </SelectGameList>
            )}
          </Nav>
          <Top3Section>
            <SectionHeader>
              <img src={crownIcon} alt="crownIcon" />
              <h2>Top3</h2>
              <div>
                <hr />
              </div>
            </SectionHeader>
            <div>
              <Top3SectionUl>
                {rankingData &&
                  (selectedGame.gameTitle === '전체 랭킹' ||
                  selectedGame.gameTitle === ''
                    ? rankingData
                        .slice(0, 3)
                        .map((userData, index) => (
                          <Top3Box
                            userData={userData}
                            index={index}
                            perGame={false}
                          />
                        ))
                    : rankingData
                        .slice(0, 3)
                        .map((userData, index) => (
                          <Top3Box
                            userData={userData}
                            index={index}
                            perGame={true}
                          />
                        )))}
              </Top3SectionUl>
            </div>
          </Top3Section>
          <div>
            <SectionHeader>
              <img src={heartIcon} alt="crownIcon" />
              <h2>All Users</h2>
              <div>
                <hr />
              </div>
            </SectionHeader>
            {rankingData &&
              selectedGame &&
              (selectedGame.gameTitle === '전체 랭킹' ||
              selectedGame.gameTitle === '' ? (
                <>
                  <Subtitle>
                    <Subtitle1>Ranking</Subtitle1>
                    <Subtitle1>Id</Subtitle1>
                    <Subtitle3>Score</Subtitle3>
                  </Subtitle>
                  <div>
                    <ul>
                      {rankingData.slice(3).map((userData, index) => (
                        <AllHonorsBox
                          userData={userData}
                          index={index}
                          perGame={false}
                        />
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Subtitle>
                    <Subtitle1>Ranking</Subtitle1>
                    <Subtitle1>Id</Subtitle1>
                    <Subtitle2>Avg Score</Subtitle2>
                    <Subtitle2>High Score</Subtitle2>
                  </Subtitle>
                  <div>
                    <ul>
                      {rankingData.slice(3).map((userData, index) => (
                        <AllHonorsBox
                          userData={userData}
                          index={index}
                          perGame={true}
                        />
                      ))}
                    </ul>
                  </div>
                </>
              ))}
          </div>
        </ContainerBody>
      </RankingContainer>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default Ranking;

const RankingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100rem;
  height: 86rem;
  transform: translate(-50%, -50%);
  font-family: 'neodgm', cursive;
  justify-content: center;
  background: #c0c0c0;
  border: 1px solid #000000;
  box-shadow: 3px 3px 4px #1c1c1c;
  font-size: 2.5rem;
  display: block;
`;

const ContainerBody = styled.div`
  height: 80rem;
  padding: 0 10rem;
  overflow-y: auto;
`;

const Nav = styled.div`
  height: 8rem;
  padding: 2rem;
`;

const SelectGameDiv = styled.div`
  width: 40rem;
  height: 4.6rem;
  position: relative;
  padding-left: 2.5rem;
  display: flex;
  align-items: center;
  background-color: #e6e6e6;
  box-shadow: inset 0.4rem 0.4rem 0.2rem 0rem #0000003f,
    inset -0.4rem -0.4rem 0.4rem 0rem #ffffff3f;
  cursor: pointer;
  font-size: 2rem;
  :hover {
    background-color: white;
  }
`;

const DropDownIcon = styled.img`
  position: absolute;
  width: 2rem;
  right: 2rem;
`;

const SelectGameList = styled.div`
  position: absolute;
  background-color: #e6e6e6;
  width: 40rem;
  margin-top: 0.7rem;
  cursor: pointer;
  z-index: 2;
  font-size: 2.2rem;
  li {
    height: 5rem;
    padding: 1rem 2.5rem;
    overflow: hidden;
    :not(:last-child) {
      border-bottom: #c0c0c0 1px solid;
    }
    :hover {
      background-color: white;
    }
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 5.5rem;
    margin-bottom: 1rem;
    margin-right: 0.6rem;
  }
  > h2 {
    font-size: 2.7rem;
    font-weight: 500;
    flex: content;
  }
  > div {
    flex: 18;
    > hr {
      position: relative;
      border: #909090 0.1rem solid;
    }
  }
`;

const Top3Section = styled.div`
  margin-bottom: 3rem;
`;

const Top3SectionUl = styled.ul`
  display: flex;
  justify-content: space-evenly;
`;

const Subtitle = styled.div`
  width: 93%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 1.5rem auto;
  div {
    font-size: 2.3rem;
    box-shadow: inset 0.3rem 0.3rem 0.3rem 0rem #00000051,
      inset -0.3rem -0.3rem 0.3rem 0rem #ffffffcc;
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
  }
`;

const Subtitle1 = styled.div`
  width: 28%;
`;
const Subtitle2 = styled.div`
  width: 21%;
`;

const Subtitle3 = styled.div`
  width: 42%;
`;
