import styled from 'styled-components';

import hang from '../../../images/hangman/4.jpg';
import hang1 from '../../../images/hangman/5.jpg';
import hang2 from '../../../images/hangman/6.jpg';
import hang3 from '../../../images/hangman/7.jpg';
import hang4 from '../../../images/hangman/8.jpg';
import hang5 from '../../../images/hangman/9.jpg';
import hang6 from '../../../images/hangman/10.jpg';

const bodyPart = [hang, hang1, hang2, hang3, hang4, hang5, hang6];

interface DrawingType {
  numberOfGuess: number;
}

const Drawing = ({ numberOfGuess }: DrawingType) => {
  return (
    <Container>
      {numberOfGuess ? (
        <img src={bodyPart[numberOfGuess]} alt="hangman" />
      ) : (
        <img src={bodyPart[0]} alt="hangman" />
      )}
    </Container>
  );
};

export default Drawing;

const Container = styled.div`
  width: 50%;
  height: 100%;

  img {
    height: 30rem;
  }
`;
