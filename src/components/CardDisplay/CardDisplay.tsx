import React from 'react';
import { PlayingCard } from '../../types';
import { getSrc, getAltText } from './utils';

interface Props {
  card: PlayingCard;
  onClick?: () => void;
}

const CardDisplay = ({ card, onClick }: Props) => {
  const src = getSrc(card);
  const alt = getAltText(card);

  return (
    <div onClick={onClick} className="CardDisplay">
      <img src={src} alt={alt} />
    </div>
  );
};

export default CardDisplay;
