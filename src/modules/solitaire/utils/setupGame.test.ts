import { keysIn } from 'lodash';
import sanityCheck from './sanityCheck';
import setupGame from './setupGame';

it('passes sanity check', () => {
  const game = setupGame();

  expect(sanityCheck(game)).toBe(true);
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
