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
import moveCard from '../../modules/solitaire/producers/moveCard';

interface Props {
  cards: Array<PlayingCard>;
  className?: string;
  layout: PileLayout;
  onPileClick?: () => void;
  dropTarget: DropTarget;
}

const isHax = () =>
  // @ts-expect-error
  window.hax === true;

const Pile = ({ className, layout, cards, onPileClick, dropTarget }: Props) => {
  const [gameState, setGameState] = useSolitaireContext();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: (item) => {
      // @ts-ignore
      const dragSource: DragSource = item.dragSource;

      return canDropCard(gameState, dragSource, dropTarget);
    },
    drop: (item) => {
      // @ts-expect-error
      const dragSource: DragSource = item.dragSource;

      return setGameState(moveCard(gameState, dragSource, dropTarget));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
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
      {isHax() && isOver && !canDrop && <Overlay color="red" />}
      {isHax() && !isOver && canDrop && <Overlay color="yellow" />}
      {isHax() && isOver && canDrop && <Overlay color="green" />}
    </div>
  );
};

export default Pile;
