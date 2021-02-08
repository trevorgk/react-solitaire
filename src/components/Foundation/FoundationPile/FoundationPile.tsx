import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../constants';

import { useSolitaireContext } from '../../../modules/solitaire/SolitaireContext';
import { Suit } from '../../../types';
import Pile from '../../Pile/Pile';

import './styles.css';
import { getBackgroundImage } from './utils';

interface Props {
  suit: Suit;
}
const FoundationPile = ({ suit }: Props) => {
  const [gameState] = useSolitaireContext();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    // drop: () => moveCard(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const backgroundImage = getBackgroundImage(suit);
  const { foundation } = gameState;

  return (
    <div
      ref={drop}
      className="FoundationPile"
      style={{
        backgroundImage,
      }}
    >
      <Pile
        dropTarget={{
          pile: 'Foundation',
          suit,
        }}
        cards={foundation[suit]}
        layout="Squared"
      />
      {isOver && <div className="FoundationPile__overlay" />}
    </div>
  );
};

export default FoundationPile;
