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
      <Pile
        dropTarget={{
          pileType: 'Tableau',
          lane: idx,
        }}
        cards={pile}
        layout="FannedDown"
      />
    </div>
  );
};

export default TableauPile;
