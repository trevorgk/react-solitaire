import produce from 'immer';

import { GameState } from '../types';
import sanityCheck from '../utils/sanityCheck';

const stockClicked = (gameState: GameState) =>
  produce(gameState, (draft) => {
    const MAX = 3;
    draft.waste.forEach((card) => (card.reveal = false));
    draft.talon = draft.talon.concat(draft.waste);
    draft.waste = [];

    if (draft.stock.length === 0) {
      draft.stock = draft.stock.concat(draft.talon.reverse());
      draft.talon = [];

      return;
    }

    for (let i = 0; i < MAX; i++) {
      const card = draft.stock.pop();
      if (card) {
        card.reveal = true;
        draft.waste.push(card);
      }
    }

    sanityCheck(draft);
  });

export default stockClicked;
