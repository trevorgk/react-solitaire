import { keysIn } from 'lodash';
import React from 'react';

import { PlayingCard } from '../../types';
import Pile from '../Pile/Pile';

import './styles.css';

interface Props {
  tableau: Record<number, Array<PlayingCard>>;
}

const Tableau = ({ tableau }: Props) => {
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
