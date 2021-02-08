import React from 'react';

import { PlayingCard } from '../../types';

import './styles.css';
import { getSrc, getAltText } from './utils';

interface Props {
  card: PlayingCard;
}

const CardDisplay = ({ card }: Props) => {
  const src = getSrc(card);
  const alt = getAltText(card);

  return (
    <div className={'CardDisplay'}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default CardDisplay;
