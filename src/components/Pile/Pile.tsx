import cx from 'classnames';
import React from 'react';
import './styles.css';
import { PileLayout, PlayingCard } from '../../types';
import { PileType } from '../../modules/solitaire/types';
import CardHolder from './CardHolder/CardHolder';

interface Props {
  cards: Array<PlayingCard>;
  className?: string;
  layout: PileLayout;
  onPileClick?: () => void;
  type: PileType;
}

const Pile = ({ className, layout, cards, onPileClick }: Props) => {
  return (
    <div
      className={cx('Pile', `Pile-layout__${layout}`, className)}
      onClick={onPileClick}
    >
      {cards.map((card, index) => (
        <CardHolder key={index} card={card} />
      ))}
    </div>
  );
};

//`Pile Pile-layout__${layout}`

export default Pile;
