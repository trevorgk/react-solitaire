import { GameState, DragSource } from '../types';

const canDrag = (gameState: GameState, dragSource: DragSource) => {
  switch (dragSource.pile) {
    case 'Tableau':
      return true;
    default:
      return false;
  }
};

export default canDrag;
