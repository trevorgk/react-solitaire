import { keysIn } from 'lodash';
import React from 'react';

import { PlayingCard, Suit } from '../../types';
import Pile from '../Pile/Pile';

import { getBackgroundImage } from './utils';
import './styles.css';

interface Props {
  foundation: Record<Suit, Array<PlayingCard>>;
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
