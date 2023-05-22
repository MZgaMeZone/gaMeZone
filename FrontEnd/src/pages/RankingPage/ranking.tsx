import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../style/ranking.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

import exitImg from '../../style/icons/x-solid.svg';
import starIcon from '../../style/icons/star.svg';
import crownIcon from '../../style/icons/crown.svg';
import heartIcon from '../../style/icons/heart.svg';
import dropdownIcon from '../../style/icons/dropdown.svg';
import MainBody from '../mainPage/main-body';
import MainFooter from '../mainPage/main-footer';

const Lanking = () => {
  const [showGameList, setShowGameList] = useState(false);
  const [mainModal, setMainModal] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        // minHeight: '880px',
        // minWidth: '900px',
        overflow: 'hidden',
      }}
    >
      <div className="rank-container">
        <div className="rank-container-header">
          <div className="rank-container-header-title">
            <img src={starIcon} alt="gameFavicon" />
            <p>명예의 전당</p>
          </div>
          <div
            className="exit-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={exitImg} alt="exitImg" />
          </div>
        </div>
        <div className="rank-container-body">
          <div className="rank-nav">
            <div
              className="select-game-header"
              onClick={() => {
                setShowGameList(!showGameList);
              }}
            >
              -- 게임을 선택해주세용 --
              <img
                className="dropdownIcon"
                src={dropdownIcon}
                alt="dropdownIcon"
              />
            </div>

            {showGameList && (
              <ul className="select-game-list">
                <li>10초 맞추기</li>
                <li>냠냠굿</li>
                <li>야옹~</li>
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
                <li>
                  <div className="ranking-idx">
                    <p>1</p>
                  </div>
                  <div className="img-circle">
                    <img src={starIcon} alt="userImg" />
                  </div>
                  <p className="userId">gomao</p>
                  <p className="avg-score">AVG: 1000</p>
                  <p className="high-score">HIGH: 1000</p>
                </li>
                <li>
                  <div className="ranking-idx">
                    <p>1</p>
                  </div>
                  <div className="img-circle">
                    <img src={starIcon} alt="userImg" />
                  </div>
                  <p className="userId">gomao</p>
                  <p className="avg-score">AVG: 1000</p>
                  <p className="high-score">HIGH: 1000</p>
                </li>
                <li>
                  <div className="ranking-idx">
                    <p>1</p>
                  </div>
                  <div className="img-circle">
                    <img src={starIcon} alt="userImg" />
                  </div>
                  <p className="userId">gomao</p>
                  <p className="avg-score">AVG: 1000</p>
                  <p className="high-score">HIGH: 1000</p>
                </li>
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
            <div className="all-ranking-section-subtitle">
              <div className="subtitle1">Ranking</div>
              <div className="subtitle1">Id</div>
              <div className="subtitle2">Avg Score</div>
              <div className="subtitle2">High Score</div>
            </div>
            <div className="all-ranking-section-body">
              <ul>
                <li>
                  <div className="ranking-idx">
                    <p>1</p>
                  </div>
                  <div className="img-circle">
                    <img src={starIcon} alt="userImg" />
                  </div>
                  <p className="userId">gomao</p>
                  <p className="avg-score">1000</p>
                  <p className="high-score">1000</p>
                </li>
                <li>
                  <div className="ranking-idx">
                    <p>1</p>
                  </div>
                  <div className="img-circle">
                    <img src={starIcon} alt="userImg" />
                  </div>
                  <p className="userId">gomao</p>
                  <p className="avg-score">1000</p>
                  <p className="high-score">1000</p>
                </li>
                <li>
                  <div className="ranking-idx">
                    <p>1</p>
                  </div>
                  <div className="img-circle">
                    <img src={starIcon} alt="userImg" />
                  </div>
                  <p className="userId">gomao</p>
                  <p className="avg-score">1000</p>
                  <p className="high-score">1000</p>
                </li>
                <li>
                  <div className="ranking-idx">
                    <p>1</p>
                  </div>
                  <div className="img-circle">
                    <img src={starIcon} alt="userImg" />
                  </div>
                  <p className="userId">gomao</p>
                  <p className="avg-score">1000</p>
                  <p className="high-score">1000</p>
                </li>
              </ul>
            </div>
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

export default Lanking;
