import { keysIn } from 'lodash';
import React from 'react';

import { Foundation as FoundationType, Suit } from '../../types';
import Pile from '../Pile/Pile';
import './styles.css';
import { getBackgroundImage } from './utils';

export interface Props {
  foundation: FoundationType;
}

const Foundation = ({ foundation }: Props) => {
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
