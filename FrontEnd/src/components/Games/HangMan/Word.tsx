import styled from 'styled-components';

interface WordProps {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
}

const Word = ({ guessedLetters, wordToGuess, reveal = false }: WordProps) => {
  return (
    <Container>
      {wordToGuess.split('').map((letter, id) => (
        <Border key={id}>
          <Letter
            guessedLetters={guessedLetters}
            letter={letter}
            reveal={reveal}
          >
            {letter}
          </Letter>
        </Border>
      ))}
    </Container>
  );
};

export default Word;

const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  max-width: 100vw;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  font-family: monospace;
  overflow-x: auto !important;

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const Border = styled.span`
  border-bottom: 0.5rem solid black;
`;

interface Letter {
  guessedLetters: string[];
  letter: string;
  reveal?: boolean;
}

const Letter = styled.span<Letter>`
  visibility: ${({ guessedLetters, letter, reveal }) =>
    guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden'};
  color: ${({ guessedLetters, letter, reveal }) =>
    !guessedLetters.includes(letter) && reveal ? '#d30000' : 'black'};
`;
