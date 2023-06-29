import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../../style/ranking.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
      <div className="rank-container">
        <ContainerHeader
          favicon={starIcon}
          title="명예의 전당"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="rank-container-body">
          <div className="rank-nav">
            <div
              className="select-game-header"
              onClick={() => {
                setShowGameList(!showGameList);
              }}
            >
              <p>{selectedGame && selectedGame.gameTitle}</p>

              <img
                className="dropdownIcon"
                src={dropdownIcon}
                alt="dropdownIcon"
              />
            </div>

            {showGameList && (
              <ul className="select-game-list">
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
              </ul>
            )}
          </div>
          <div className="top3-section">
            <div className="section-header">
              <img src={crownIcon} alt="crownIcon" />
              <h2>Top3</h2>
              <div>
                <hr />
              </div>
            </div>
            <div className="top3-section-body">
              <ul>
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
              </ul>
            </div>
          </div>
          <div className="all-ranking-section">
            <div className="section-header">
              <img src={heartIcon} alt="crownIcon" />
              <h2>All Users</h2>
              <div>
                <hr />
              </div>
            </div>
            {rankingData &&
              selectedGame &&
              (selectedGame.gameTitle === '전체 랭킹' ||
              selectedGame.gameTitle === '' ? (
                <>
                  <div className="all-ranking-section-subtitle">
                    <div className="subtitle1">Ranking</div>
                    <div className="subtitle1">Id</div>
                    <div className="subtitle3">Score</div>
                  </div>
                  <div className="all-ranking-section-body">
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
                  <div className="all-ranking-section-subtitle">
                    <div className="subtitle1">Ranking</div>
                    <div className="subtitle1">Id</div>
                    <div className="subtitle2">Avg Score</div>
                    <div className="subtitle2">High Score</div>
                  </div>
                  <div className="all-ranking-section-body">
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
        </div>
      </div>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default Ranking;
