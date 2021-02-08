import produce from 'immer';

import { GameState } from '../types';
import sanityCheck from '../utils/sanityCheck';

const tableauClicked = (gameState: GameState, lane: number) =>
  produce(gameState, (draft) => {
    const pile = draft.tableau[lane];

    if (pile.length === 0) {
      return;
    }

    pile[pile.length - 1].reveal = true;

    sanityCheck(draft);
  });

export default tableauClicked;
