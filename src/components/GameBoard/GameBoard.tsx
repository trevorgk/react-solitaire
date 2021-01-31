import react from 'react';
import { generatePack } from '../../utils/pack';
import Pile from '../Pile/Pile';

const GameBoard = () => {
  const pile = generatePack(true);
  return (
    <div className="GameBoard">
      <Pile cards={pile} layout="SpreadRight" />
    </div>
  );
};

export default GameBoard;
