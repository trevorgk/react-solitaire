import { keysIn } from 'lodash';
import { Suit } from '../../../types';
import setupGame from './setupGame';

it('there is a total of 52 cards', () => {
  const game = setupGame();

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
  expect(sum).toEqual(52);
});

it('reveals only the last card of each tableau pile', () => {
  const game = setupGame();

  keysIn(game.tableau).forEach((idx) => {
    const pile = game.tableau[parseInt(idx)];
    for (let i = 0; i < pile.length; i++) {
      expect(pile[i].reveal).toBe(i === pile.length - 1);
    }
  });
});
