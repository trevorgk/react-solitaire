import { pips } from './../../../types';
import { GameState, DragSource, DropTarget } from '../types';
import getDraggedCard from './getDraggedCard';
import getTargetPile from './getTargetPile';

const canDrop = (
  gameState: GameState,
  dragSource: DragSource,
  dropTarget: DropTarget,
): boolean => {
  const sourceCard = getDraggedCard(gameState, dragSource);
  const pile = getTargetPile(gameState, dropTarget);

  switch (dropTarget.pileType) {
    case 'Foundation':
      if (dropTarget.suit === sourceCard.suit) {
        return sourceCard.pip === pips[pile.length];
      }
      break;
    case 'Tableau':
      if (pile.length !== 0) {
        const last = pile[pile.length - 1];
        return (
          last.colour !== sourceCard.colour &&
          pips.indexOf(last.pip) === pips.indexOf(sourceCard.pip) + 1
        );
      } else {
        return sourceCard.pip === 'King';
      }
  }

  return false;
};

export default canDrop;
