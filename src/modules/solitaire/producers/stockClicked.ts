import produce from 'immer';

import { GameState } from '../types';
import sanityCheck from '../utils/sanityCheck';

const stockClicked = (gameState: GameState) => {
  const update = produce(gameState, (draft) => {
    const MAX = 3;
    draft.talon.forEach((card) => (card.reveal = false));
    draft.waste = draft.waste.concat(draft.talon);
    draft.talon = [];

    if (draft.stock.length === 0) {
      draft.stock = draft.stock.concat(draft.waste.reverse());
      draft.waste = [];

      return;
    }

    for (let i = 0; i < MAX; i++) {
      const card = draft.stock.pop();
      if (card) {
        card.reveal = true;
        draft.talon.push(card);
      }
    }
  });

  sanityCheck(update);
  return update;
};

export default stockClicked;
