import { PlayingCard, Suit } from '../../../types';
import { generatePack } from '../../../utils/pack';
import { GameState } from './../types';

const NUM_TABLEAU_PILES = 7;

const setupGame = (): GameState => {
  const cards = generatePack().slice();

  const getTableau = (): Record<number, Array<PlayingCard>> => {
    const tableau: Record<number, Array<PlayingCard>> = {};
    for (let i = 0; i < NUM_TABLEAU_PILES; i++) {
      tableau[i] = [];
    }
    for (let i = 0; i < NUM_TABLEAU_PILES; i++) {
      for (let j = i; j < NUM_TABLEAU_PILES; j++) {
        const card = cards.shift();
        if (!card) {
          throw new Error('Not enough cards...');
        }
        tableau[j].push({ ...card, reveal: j === i });
      }
    }

    return tableau;
  };

  const tableau = getTableau();

  const foundation: Record<Suit, Array<PlayingCard>> = {
    Spades: [],
    Clubs: [],
    Diamonds: [],
    Hearts: [],
  };

  const stock = cards;
  const waste: Array<PlayingCard> = [];
  const talon: Array<PlayingCard> = [];

  return {
    stock,
    waste,
    talon,
    foundation,
    tableau,
  };
};

export default setupGame;
