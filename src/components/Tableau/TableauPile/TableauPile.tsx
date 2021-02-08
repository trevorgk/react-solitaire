import React from 'react';
import tableauClicked from '../../../modules/solitaire/producers/tableauClicked';

import { useSolitaireContext } from '../../../modules/solitaire/SolitaireContext';
import Pile from '../../Pile/Pile';

import './styles.css';

interface Props {
  idx: number;
}

const TableauPile = ({ idx }: Props) => {
  const [gameState, setGameState] = useSolitaireContext();

  const { tableau } = gameState;

  const pile = tableau[idx];

  const onTableauClick = () => setGameState(tableauClicked(gameState, idx));

  return (
    <div className="TableauPile">
      <Pile
        dropTarget={{
          pileType: 'Tableau',
          lane: idx,
        }}
        cards={pile}
        onPileClick={onTableauClick}
        layout="FannedDown"
      />
    </div>
  );
};

export default TableauPile;
