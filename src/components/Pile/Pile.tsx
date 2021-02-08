import cx from 'classnames';
import React from 'react';
import './styles.css';
import { PileLayout, PlayingCard } from '../../types';
import { DropTarget } from '../../modules/solitaire/types';
import CardHolder from './CardHolder/CardHolder';

interface Props {
  cards: Array<PlayingCard>;
  className?: string;
  layout: PileLayout;
  onPileClick?: () => void;
  dropTarget: DropTarget;
}

const Pile = ({ className, layout, cards, onPileClick, dropTarget }: Props) => {
  return (
    <div
      className={cx('Pile', `Pile-layout__${layout}`, className)}
      onClick={onPileClick}
    >
      {cards.map((card, position) => (
        <CardHolder
          dragSource={
            dropTarget.pile === 'Tableau' || dropTarget.pile === 'Waste'
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
    </div>
  );
};

//`Pile Pile-layout__${layout}`

export default Pile;
