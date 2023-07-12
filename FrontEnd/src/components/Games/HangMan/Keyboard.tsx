import styled from 'styled-components';

const KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

interface KeyboardType {
  correctLetters: string[];
  incorrectLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled?: boolean;
}

const Keyboard = ({
  correctLetters,
  incorrectLetters,
  addGuessedLetter,
  disabled = false,
}: KeyboardType) => {
  return (
    <Container>
      <Grid>
        {KEYS.map((key) => {
          const active = correctLetters.includes(key);
          const inactive = incorrectLetters.includes(key);

          return (
            <Key
              key={key}
              active={active}
              inActive={inactive}
              disabled={active || inactive || disabled}
              onClick={() => {
                addGuessedLetter(key);
              }}
            >
              {key}
            </Key>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Keyboard;

const Container = styled.div`
  align-self: stretch;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 1rem;
  width: 100%;
`;

interface KeyType {
  active: boolean;
  inActive: boolean;
}

const Key = styled.button<KeyType>`
  aspect-ratio: 1/1;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #000000;
  outline: none;
  box-shadow: rgba(255, 255, 255, 0.8) -3px -3px 3px inset,
    rgba(0, 0, 0, 0.32) 3px 3px 3px inset;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  background: ${({ active }) => (active ? '#000080' : '#c0c0c0')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  opacity: ${({ inActive }) => (inActive ? '.3' : '1')};
  cursor: pointer;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background-color: #000080;
    color: #ffffff;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:active {
    background-color: #d9d9d9;
    border: #e0e0e0 solid 2px;
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;
