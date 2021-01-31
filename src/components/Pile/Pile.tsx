import React from 'react';
import './styles.css';
import { PileLayout, PlayingCard } from '../../types';
import CardDisplay from '../CardDisplay/CardDisplay';

interface Props {
  layout: PileLayout;
  cards: Array<PlayingCard>;
}

const Pile = ({ layout, cards }: Props) => {
  return (
    <div className={`Pile Pile-layout__${layout}`}>
      {cards.map((card, index) => (
        <CardDisplay key={index} card={card} />
      ))}
    </div>
  );
};

export default Pile;
