import { keysIn } from 'lodash';
import React from 'react';
import { useSolitaireContext } from '../../modules/solitaire/SolitaireContext';

import Pile from '../Pile/Pile';

import './styles.css';

const Tableau = () => {
  const [gameState] = useSolitaireContext();

  const { tableau } = gameState;

  return (
    <div className="Tableau">
      {keysIn(tableau).map((idx) => {
        return (
          <div className="TableauPile">
            <Pile cards={tableau[parseInt(idx)]} layout="FannedDown" />
          </div>
        );
      })}
    </div>
  );
};

export default Tableau;
