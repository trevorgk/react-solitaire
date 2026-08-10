import cx from 'classnames';
import { useDrop } from 'react-dnd';

import { ItemTypes } from '../../constants';
import { PileLayout, PlayingCard } from '../../types';
import { useSolitaireContext } from '../../modules/solitaire/SolitaireContext';
import { CardDragItem, DropTarget } from '../../modules/solitaire/types';
import canDropCard from '../../modules/solitaire/utils/canDrop';
import moveCard from '../../modules/solitaire/producers/moveCard';

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

declare global {
  interface Window {
    hax?: boolean;
  }
}

const isHax = () => window.hax === true;

const Pile = ({ className, layout, cards, onPileClick, dropTarget }: Props) => {
  const [gameState, setGameState] = useSolitaireContext();
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      canDrop: (item: CardDragItem) =>
        canDropCard(gameState, item.dragSource, dropTarget),
      drop: (item: CardDragItem) => {
        setGameState(moveCard(gameState, item.dragSource, dropTarget));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [gameState, dropTarget, setGameState],
  );

  return (
    <div
      ref={(node) => {
        drop(node);
      }}
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
