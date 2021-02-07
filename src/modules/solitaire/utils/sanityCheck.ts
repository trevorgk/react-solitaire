import { keysIn } from 'lodash';

import { Suit } from '../../../types';
import { GameState } from '../types';

const sanityCheck = (game: GameState): boolean => {
  let sum = 0;
  sum += game.stock.length;
  sum += game.waste.length;
  sum += game.talon.length;

  keysIn(game.foundation).forEach((suit) => {
    sum += game.foundation[suit as Suit].length;
  });

  keysIn(game.tableau).forEach((idx) => {
    sum += game.tableau[parseInt(idx)].length;
  });

  return sum === 52;
};

export default sanityCheck;
