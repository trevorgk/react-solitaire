import cx from 'classnames';
import React from 'react';
import './styles.css';
import { PileLayout, PlayingCard } from '../../types';
import CardDisplay from '../CardDisplay/CardDisplay';

interface Props {
  cards: Array<PlayingCard>;
  className?: string;
  layout: PileLayout;
  onPileClick?: () => void;
}

const Pile = ({ className, layout, cards, onPileClick }: Props) => {
  return (
    <div
      className={cx('Pile', `Pile-layout__${layout}`, className)}
      onClick={onPileClick}
    >
      {cards.map((card, index) => (
        <CardDisplay key={index} card={card} />
      ))}
    </div>
  );
};

//`Pile Pile-layout__${layout}`

export default Pile;
