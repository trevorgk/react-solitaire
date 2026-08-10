import cx from 'classnames';
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
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { dragSource },
      canDrag: () => canDragCard(gameState, dragSource),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [gameState, dragSource],
  );

  return (
    <div
      onClick={onClick}
      className={cx('CardHolder', { 'CardHolder--isDragging': isDragging })}
      ref={(node) => {
        drag(node);
      }}
    >
      <CardDisplay card={card} />
    </div>
  );
};

export default CardHolder;
