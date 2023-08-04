import React, { useState, useEffect } from 'react';
import { get } from '../../api/api';
import styled from 'styled-components';
import middleBarIcon from '../../style/icons/manual-icon1.svg';
import memoFavicon from '../../style/icons/memo_favicon.svg';
import { manualDataType } from '../../types/gameType';
import ContainerHeader from '../Common/ContainerHeader';

const GameManual = (props: {
  setShowManual: (show: boolean) => void;
  gameId: string | undefined;
}) => {
  const { setShowManual, gameId } = props;
  const [manualData, setManualData] = useState<manualDataType>();

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await get<manualDataType>(`/api/games/${gameId}`);
      setManualData(responseData.data);
    };
    fetchData();
  }, []);

  return (
    <ManualContainer>
      <ContainerHeader
        favicon={memoFavicon}
        title="게임 설명"
        onClick={() => {
          setShowManual(false);
        }}
      />
      <MiddleBar>
        <MiddleBarBox>
          <MiddleBarIcon
            direction="left"
            src={middleBarIcon}
            alt="middleBarIcon"
          />
          <MiddleBarIcon
            direction="right"
            src={middleBarIcon}
            alt="middleBarIcon"
          />
          <p>
            &emsp;•&emsp;•&emsp;•&emsp;1&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;2&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;3&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;4&emsp;•&emsp;•&emsp;•&emsp;|&emsp;•&emsp;•&emsp;•&emsp;5
          </p>
        </MiddleBarBox>
      </MiddleBar>
      <ManualContainerBody>
        {manualData && (
          <div key={manualData._id}>
            <ManuaTitle>게임 소개</ManuaTitle>
            <ManualDescription>{manualData.gameDescription}</ManualDescription>
            <ManuaTitle>게임 진행 방법</ManuaTitle>

            <ManualDescription>{manualData.gameManual}</ManualDescription>
          </div>
        )}
      </ManualContainerBody>
    </ManualContainer>
  );
};

export default GameManual;

const ManualContainer = styled.div`
  font-family: 'neodgm', cursive;
  height: 77rem;
  width: 50rem;
  margin: 10rem auto auto auto;
  background: #c0c0c0;
  border: 1px solid #000000;
  box-shadow: 3px 3px 4px #1c1c1c;
  font-size: 2.5rem;
  display: inline-block;
`;

const MiddleBar = styled.div`
  width: 93%;
  height: 3.7rem;
  margin: 0.8rem auto;
  background-color: white;
  box-shadow: inset 0.3rem 0.3rem 0.4rem 0.1rem #161616cc;
`;

const MiddleBarBox = styled.pre`
  position: relative;
  height: 100%;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  p {
    overflow: hidden;
  }
`;

const MiddleBarIcon = styled.img<{ direction: string }>`
  position: absolute;
  top: 0rem;
  left: ${({ direction }) => direction === 'left' && '-0.7rem'};
  right: ${({ direction }) => direction === 'right' && '-0.7rem'};
  width: 1.9rem;
`;

const ManualContainerBody = styled.div`
  display: block;
  width: 93%;
  height: 83%;
  margin: 0 auto 1.5rem auto;
  padding: 1rem 3rem 2rem 3rem;
  color: rgb(0, 0, 0);
  background-color: rgb(254, 254, 254);
  box-shadow: inset 0.2rem 0.2rem 0.3rem 0.3rem #161616cc;
  div {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
`;

const ManuaTitle = styled.p`
  font-size: 2.7rem;
  padding: 1rem;
  border-top: 0.3rem dashed black;
  border-bottom: 0.3rem dashed black;
  margin: 3rem auto;
`;

const ManualDescription = styled.pre`
  line-height: 3.5rem;
  font-size: 1.9rem;
  white-space: normal;
`;
