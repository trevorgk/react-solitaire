import cx from 'classnames';
import React from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '../../../constants';
import { useSolitaireContext } from '../../../modules/solitaire/SolitaireContext';
import { DragSource } from '../../../modules/solitaire/types';
import canDragCard from '../../../modules/solitaire/utils/canDrag';
import { PlayingCard } from '../../../types';
import CardDisplay from '../../CardDisplay/CardDisplay';

import './styles.css';

interface Props {
  card: PlayingCard;
  dragSource: DragSource;
  onClick?: () => void;
}

const CardHolder = ({ card, dragSource, onClick }: Props) => {
  const [gameState] = useSolitaireContext();
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, dragSource },
    canDrag: () => canDragCard(gameState, dragSource),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      onClick={onClick}
      className={cx('CardHolder', { 'CardHolder--isDragging': isDragging })}
      ref={drag}
    >
      <CardDisplay card={card} />
    </div>
  );
};

export default CardHolder;
