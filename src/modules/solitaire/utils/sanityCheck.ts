import { keysIn } from 'lodash';

import { Suit } from '../../../types';
import { GameState } from '../types';

const sanityCheck = (game: GameState): true => {
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

  if (sum !== 52) {
    throw new Error('Game no longer contains 52 cards');
  }

  return true;
};

export default sanityCheck;
