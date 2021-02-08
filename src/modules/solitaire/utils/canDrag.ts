import { GameState, DragSource } from '../types';

const canDrag = (gameState: GameState, dragSource: DragSource) => {
  switch (dragSource.pileType) {
    case 'Tableau':
      const card = gameState.tableau[dragSource.lane][dragSource.position];
      return card.reveal;
    case 'Waste':
      return dragSource.position === gameState.waste.length - 1;
    default:
      return false;
  }
};

export default canDrag;
