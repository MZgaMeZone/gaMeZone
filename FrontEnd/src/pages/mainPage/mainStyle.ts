import styled from 'styled-components';
import { Link } from 'react-router-dom';

// body
export const TodayVisitor = styled.div`
  background-color: beige;
  position: fixed;
  top: 0;
  display: flex;
  margin: 10px 27px;
  font-size: 2rem;
`;
export const TotalVisitor = styled.div`
  background-color: beige;
  position: fixed;
  top: 0;
  display: flex;
  margin: 25px 27px;
  font-size: 2rem;
`;

export const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

export const CategoryLeftLine = styled.div`
  background-color: #a4a4a4;
  display: flex;
  align-items: end;
  justify-content: end;
`;

export const CategoryBox = styled.ul`
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
export const CategoryButton = styled.button`
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

export const CategoryContainer = styled.div`
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

export const CategoryModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(50% - 5rem);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 128rem;
  height: 100%;
  box-sizing: border-box;
  background-color: #c0c0c0;
  border: 0.1rem solid #000000;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0.4rem;
`;

export const CategoryHeader = styled.div`
  height: 4.2rem;
  display: flex;
  padding-left: 1.5rem;
  position: relative;
  background: #000080;
`;

export const CategoryTitle = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-size: 2rem;
  justify-content: flex-start;
`;

export const CategoryHeaderButton = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  width: 3rem;
  height: 3rem;
`;

// footer
export const FooterBar = styled.div`
  background-color: #c0c0c0;
  display: flex;
  position: absolute;
  align-items: center;
  white-space: nowrap;
  height: 5rem;
  position: sticky;
  bottom: 0;
  z-index: 2;
  background: #c0c0c0;
  border-top: #e0e0e0 solid 2px;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const StartButton = styled.button`
  margin: 0.3rem 1rem 0.3rem 0.6rem;
  width: 18rem;
  height: 3.8rem;
  background: #c0c0c0;
  border: #e0e0e0 solid 2px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  text-align: center;
  color: #242424;
  font-size: 2.5rem;
  padding-top: 0.6rem;
  &:active {
    background-color: #d9d9d9;
    border: #e0e0e0 solid 2px;
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

export const Clock = styled.div`
  height: 3.5rem;
  font-size: 2.6rem;
  margin-left: auto;
  margin-right: 0.4rem;
  text-align: center;
  padding: 1rem 1rem 0 1rem;
  white-space: nowrap;
  width: fit-content;
  height: 3.8rem;
  box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.6);
  border: #e0e0e0 solid 2px;
  background: #d9d9d9;
  color: #242424;
  background-color: #e9e9e9;
`;

export const SubButton = styled(Link)`
  margin: 0.4rem;
  border-radius: 0;
  font-size: 3rem;
  border: 1px none;
  width: 20rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9e9e9;
  box-shadow: 1px 1px 1px rgb(55, 55, 55);
  &:active {
    background-color: #d9d9d9;
    border: #e0e0e0 solid 2px;
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

// header
export const HitGameBox = styled.div`
  display: flex;
  position: fixed;
  top: 45px;
  justify-content: flex-end;
  // background-color: beige;
  // margin-top: 7rem;
  margin-right: 2rem;
  // align-items: center;
  width: fit-content;
  height: 600px;
`;
export const HitGameButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1rem;
  justify-content: center;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 20px;
  width: 15rem;
  height: 15rem;
`;
export const GameImage = styled.img`
  width: 100%;
  height: auto;
  // overflow: hidden;
`;
