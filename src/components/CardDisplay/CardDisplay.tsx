import cx from 'classnames';
import React from 'react';
import { useDrag } from 'react-dnd';

import { PlayingCard } from '../../types';
import { getSrc, getAltText } from './utils';
import { ItemTypes } from '../../constants';
import './styles.css';

interface Props {
  card: PlayingCard;
  onClick?: () => void;
}

const CardDisplay = ({ card, onClick }: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const src = getSrc(card);
  const alt = getAltText(card);

  return (
    <div
      onClick={onClick}
      className={cx('CardDisplay', { 'CardDisplay--isDragging': isDragging })}
      ref={drag}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export default CardDisplay;
