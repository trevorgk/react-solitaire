import React from 'react';

import { useSolitaireContext } from '../../../modules/solitaire/SolitaireContext';
import Pile from '../../Pile/Pile';

import './styles.css';

interface Props {
  idx: number;
}

const TableauPile = ({ idx }: Props) => {
  const [gameState] = useSolitaireContext();

  const { tableau } = gameState;

  const pile = tableau[idx];

  return (
    <div className="TableauPile">
      <Pile cards={pile} layout="FannedDown" />
    </div>
  );
};

export default TableauPile;
