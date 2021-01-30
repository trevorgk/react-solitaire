import React from 'react';
import { PlayingCard } from '../../models/PlayingCard';
import CardDisplay from '../CardDisplay/CardDisplay';

const aceOfDiamonds = new PlayingCard('Ace', 'Diamonds');

const GameBoard = () => (
  <div className="GameBoard">
    <CardDisplay card={aceOfDiamonds} />
  </div>
);

export default GameBoard;
