import React, { useState } from 'react';
import { PlayingCard } from '../../types';
import CardDisplay from '../CardDisplay/CardDisplay';

const GameBoard = () => {
  const [card, setCard] = useState<PlayingCard>({
    pip: 'Ace',
    suit: 'Diamonds',
    reveal: false,
  });

  const onClick = () => {
    setCard({ ...card, reveal: !card.reveal });
  };

  return (
    <div className="GameBoard">
      <CardDisplay onClick={onClick} card={card} />
    </div>
  );
};

export default GameBoard;
