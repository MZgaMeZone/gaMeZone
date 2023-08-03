import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { get } from '../../../api/api';
import wordList from './wordList.json';
import HangManRecorder from './HangManRecorder';
import Keyboard from './Keyboard';
import Drawing from './Draw';
import Word from './Word';

const randomWord = (wordList: string[]) => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};

interface userDataType {
  email?: string;
  nickname: string;
}

const Hangman = (props: { setGameName: (name: string) => void }) => {
  const [guessWord, setGuessWord] = useState(randomWord(wordList));
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState<userDataType>({
    nickname: 'Anonymous',
  });
  const { setGameName } = props;
  const navigate = useNavigate();

  useEffect(() => {
    setGameName('행맨');
  });
  const userToken: string | null = localStorage.getItem('userToken');

  useEffect(() => {
    if (!userToken) {
      setUserData({
        nickname: 'Anonymous',
      });
    } else {
      const fetchData = async () => {
        const responseData = await get<userDataType>('/api/users');
        setUserData(responseData.data);
      };
      fetchData();
    }
  }, []);

  // 만약 문제 단어 안에 작성한 알파벳이 없으면 추가
  const incorrectLetters = guessedLetters.filter(
    (letter) => !guessWord.includes(letter)
  );

  // 목숨은 7개
  const gameOver = incorrectLetters.length >= 7;
  const success = guessWord
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const addGuessLetter = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    }
  };

  useEffect(() => {
    if (success) {
      setScore(() => score + 50);
    }
  }, [success]);

  const restartHandler = () => {
    if (gameOver) {
      setGuessWord(randomWord(wordList));
      setGuessedLetters([]);
      setScore(0);
      HangManRecorder(navigate, score, userData);
    }
  };

  const continueGame = () => {
    setGuessWord(randomWord(wordList));
    setGuessedLetters([]);
  };

  return (
    <Container>
      <GameHeader>
        <div>
          SCORE: <span>{score}</span>
        </div>
      </GameHeader>
      <MainContainer>
        {!(success || gameOver) ? (
          <Drawing numberOfGuess={incorrectLetters.length} />
        ) : (
          <EndGame success={success}></EndGame>
        )}
        <Word
          reveal={gameOver}
          wordToGuess={guessWord}
          guessedLetters={guessedLetters}
        />
        {success && (
          <TryAgainButton onClick={continueGame}>Continue</TryAgainButton>
        )}
      </MainContainer>
      {!(success || gameOver) ? (
        <Keyboard
          disabled={success || gameOver}
          correctLetters={guessedLetters.filter((letter) =>
            guessWord.includes(letter)
          )}
          incorrectLetters={incorrectLetters}
          addGuessedLetter={addGuessLetter}
        />
      ) : (
        <ButtonContainer>
          <TryAgainButton style={{ width: '25%' }} onClick={restartHandler}>
            Try Again
          </TryAgainButton>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default Hangman;

const Container = styled.div`
  width: 80rem;
  height: 51rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ffffff;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: center;
  color: #000000;
  font-size: 2.7rem;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 2.5rem 0;
`;

const EndGame = styled.div`
  color: ${(props: { success: boolean }) => (props.success ? 'black' : 'red')};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const TryAgainButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  border: 3px solid black;
  border-radius: 1rem;
  font-size: 2.5rem;
  background: #c0c0c0;
  color: black;
  cursor: pointer;

  &:hover,
  &:focus {
    background: #000080;
    color: #ffffff;
  }
`;
