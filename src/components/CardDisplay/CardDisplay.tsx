import React from 'react';
import { PlayingCard } from '../../models/PlayingCard';

interface Props {
  card: PlayingCard;
}

const CardDisplay = ({ card }: Props) => {
  const display = card.reveal ? card.getImageFile() : PlayingCard.backFace;

  return (
    <div className="CardDisplay">
      <img src={display} alt={card.toString()} />
    </div>
  );
};

export default CardDisplay;
