import produce from 'immer';
import { PlayingCard } from '../../../types';

import { GameState, DragSource, DropTarget } from '../types';
import sanityCheck from '../utils/sanityCheck';

const moveCard = (
  gameState: GameState,
  dragSource: DragSource,
  dropTarget: DropTarget,
) =>
  produce(gameState, (draft) => {
    let cards: Array<PlayingCard> = [];
    switch (dragSource.pileType) {
      case 'Tableau':
        const tableauPile = draft.tableau[dragSource.lane];
        cards = tableauPile.slice(dragSource.position);
        draft.tableau[dragSource.lane] = tableauPile.slice(
          0,
          dragSource.position,
        );
        break;
      case 'Waste':
        const card = draft.waste.pop();
        if (card) {
          cards = [card];
        }
    }

    if (cards.length === 0) {
      console.error('could not find cards to move', dragSource, dropTarget);
    }

    switch (dropTarget.pileType) {
      case 'Foundation':
        if (cards.length > 1) {
          throw new Error('cannot add multiple cards to foundation');
        }
        draft.foundation[dropTarget.suit] = draft.foundation[
          dropTarget.suit
        ].concat(cards);
        break;
      case 'Tableau':
        draft.tableau[dropTarget.lane] = draft.tableau[dropTarget.lane].concat(
          cards,
        );
        break;
    }

    sanityCheck(draft);
  });

export default moveCard;
