import cx from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from '../../constants';
import { PileLayout, PlayingCard } from '../../types';
import { useSolitaireContext } from '../../modules/solitaire/SolitaireContext';
import { DragSource, DropTarget } from '../../modules/solitaire/types';
import canDropCard from '../../modules/solitaire/utils/canDrop';

import CardHolder from './CardHolder/CardHolder';
import './styles.css';
import Overlay from './Overlay/Overlay';

interface Props {
  cards: Array<PlayingCard>;
  className?: string;
  layout: PileLayout;
  onPileClick?: () => void;
  dropTarget: DropTarget;
}

const Pile = ({ className, layout, cards, onPileClick, dropTarget }: Props) => {
  const [gameState] = useSolitaireContext();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: (item) => {
      // @ts-ignore
      const dragSource: DragSource = item.dragSource;

      return canDropCard(gameState, dragSource, dropTarget);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  if (isOver) {
    console.log({ canDrop });
  }
  return (
    <div
      ref={drop}
      className={cx('Pile', `Pile-layout__${layout}`, className)}
      onClick={onPileClick}
    >
      {cards.map((card, position) => (
        <CardHolder
          dragSource={
            dropTarget.pileType === 'Tableau' || dropTarget.pileType === 'Waste'
              ? {
                  ...dropTarget,
                  position,
                }
              : dropTarget
          }
          key={position}
          card={card}
        />
      ))}
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  );
};

//`Pile Pile-layout__${layout}`

export default Pile;
