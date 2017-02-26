import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { PlayingCard, Suit } from '../models/playingCards';
import { PileLayout, PileType, Foundation as FoundationModel } from '../models/klondike';
import { Pile, KlondikeCard } from '.';
import { keysIn } from 'lodash/object';

interface Props {
  store: KlondikeStore;
}

export const Foundation: React.StatelessComponent<Props> = ({store}) => {
  const {
    foundations
  } = store;
  
  return <div className="foundation-component">
      {
        keysIn(foundations).map(suit => (
          <div key={suit} className={`foundation__pile ${suit.toLowerCase()}`}>
            <Pile layout={'Squared'} pileType={'Foundation'} pile={foundations[suit]} store={store} foundationSuit={suit}/>
          </div>
        ))
      }
    </div>
  };

  Foundation.displayName = 'FoundationComponent';