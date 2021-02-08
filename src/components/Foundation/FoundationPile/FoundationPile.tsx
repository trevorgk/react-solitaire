import React from 'react';

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

  const { foundation } = gameState;
  const backgroundImage = getBackgroundImage(suit);

  return (
    <div
      className="FoundationPile"
      style={{
        backgroundImage,
      }}
    >
      <Pile cards={foundation[suit]} layout="Squared" />
    </div>
  );
};

export default FoundationPile;