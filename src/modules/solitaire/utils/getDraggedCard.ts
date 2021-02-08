import { PlayingCard } from '../../../types';
import { GameState, DragSource } from './../types';

const getDraggedCard = (
  gameState: GameState,
  dragSource: DragSource,
): PlayingCard => {
  switch (dragSource.pileType) {
    case 'Tableau':
      const tableauPile = gameState.tableau[dragSource.lane];
      return tableauPile[dragSource.position];
    case 'Waste':
      return gameState.waste[dragSource.position];
    case 'Foundation':
      const pile = gameState.foundation[dragSource.suit];
      return pile[pile.length - 1];
    case 'Stock':
      return gameState.stock[gameState.stock.length - 1];
  }
};

export default getDraggedCard;
