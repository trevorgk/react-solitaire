import { PlayingCard } from '../../../types';
import { GameState, DropTarget } from './../types';

const getTargetPile = (
  gameState: GameState,
  dropTarget: DropTarget,
): Array<PlayingCard> => {
  switch (dropTarget.pileType) {
    case 'Foundation':
      return gameState.foundation[dropTarget.suit];
    case 'Waste':
      return gameState.waste;
    case 'Tableau':
      return gameState.tableau[dropTarget.lane];
    case 'Stock':
      return gameState.stock;
  }
};

export default getTargetPile;
