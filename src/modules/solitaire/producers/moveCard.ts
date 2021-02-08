import produce from 'immer';

import { GameState } from '../types';
import sanityCheck from '../utils/sanityCheck';

const moveCard = (gameState: GameState) =>
  produce(gameState, (draft) => {
    sanityCheck(draft);
  });

export default moveCard;
