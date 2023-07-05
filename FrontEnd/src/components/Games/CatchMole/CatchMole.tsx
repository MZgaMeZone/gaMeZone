import React, { useEffect } from 'react';
import styled from 'styled-components';
import backGroundImg from '../../../style/images/CatchMoleBackground.svg'
import moleImg from '../../../style/images/mole.svg'

function CatchMole(props: { setGameName: (name: string) => void }) {
  const { setGameName } = props;
  useEffect(() => {
    setGameName('두더지 게임 준비 중');
  });

  return (<GameContainer>
    <GameHeader>
<div>점수: <span>0</span>점</div>
<div>남은 시간: <span>60</span>초</div>
</GameHeader>
<GameBody>
  <div><img src={moleImg} alt="" /></div>
  <div><img src={moleImg} alt="" /></div>
  <div><img src={moleImg} alt="" /></div>
  <div><img src={moleImg} alt="" /></div>
  <div><img src={moleImg} alt="" /></div>
  <div><img src={moleImg} alt="" /></div>
  <div><img src={moleImg} alt="" /></div>
  <div><img src={moleImg} alt="" /></div>
  <div><img src={moleImg} alt="" /></div>
</GameBody>

  </GameContainer>);
}

export default CatchMole;

const GameContainer = styled.div`
width: 80rem;
height: 50rem;
background-image: url(${backGroundImg});
background-size: cover;
padding: 1.5rem
`

const GameHeader = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  div:last-child::before {
    margin: 0 2rem;
    content: "|";
  }
`
const GameBody = styled.div`
width: 70%;
height: 90%;
margin: auto;
display: grid;
grid-template-columns: repeat(3, 1fr);
  grid-template-rows:repeat(3, 1fr);
  row-gap: 1.5rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width:6rem;
      margin-right:1rem;
    }
  }
`


