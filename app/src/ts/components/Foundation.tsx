import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { PlayingCard } from '../models/playingCards';
import { PileLayout, PileType } from '../models/klondike';
import { Pile, KlondikeCard } from '.';

interface Props {
  store: KlondikeStore;
}

export const Foundation: React.StatelessComponent<Props> = ({store}) => {
  const {
    foundations: piles
  } = store;
  
  return <div className="foundation-component">
      {
        piles.map((pile, row) => {
          // let validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.EMPTYTABLEAU, row: this.props.row });
          return <div key={row} className="foundation__pile">
              <Pile key={`foundation.${row}`} layout={'Squared'} pileType={'Foundation'} pile={pile} store={store} />
            </div>
          })
      }
    </div>
  };

  Foundation.displayName = 'FoundationComponent';