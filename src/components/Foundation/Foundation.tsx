import { keysIn } from 'lodash';
import React from 'react';

import Pile from '../Pile/Pile';
import { useSolitaireContext } from '../../modules/solitaire/SolitaireContext';
import { Suit } from '../../types';

import { getBackgroundImage } from './utils';
import './styles.css';

const Foundation = () => {
  const [gameState] = useSolitaireContext();

  const { foundation } = gameState;
  return (
    <div className="Foundation">
      {keysIn(foundation).map((suit) => {
        const backgroundImage = getBackgroundImage(suit as Suit);

        return (
          <div
            className={`FoundationPile FoundationPile__${suit}`}
            style={{
              backgroundImage,
            }}
          >
            <Pile cards={foundation[suit as Suit]} layout="Squared" />
          </div>
        );
      })}
    </div>
  );
};

export default Foundation;
