import React from 'react';
import { PileLayout, PlayingCard } from '../../types';
import CardDisplay from '../CardDisplay/CardDisplay';

interface Props {
  layout: PileLayout;
  cards: Array<PlayingCard>;
}

const Pile = ({ layout, cards }: Props) => {
  return (
    <div className="Pile">
      {cards.map((card) => (
        <CardDisplay card={card} />
      ))}
    </div>
  );
};

export default Pile;
