import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { PlayingCard } from '../models/playingCards';
import { PileLayout, PileType } from '../models/klondike';
import { Pile, KlondikeCard } from '.';

interface Props {
  store: KlondikeStore
}

export const Tableau: React.StatelessComponent<Props> = ({store}) => {
  const {
    tableau: piles
  } = store;

  return (
    <div className="tableau-component">
      {
        piles.map((pile, row) => (
          <div className="tableau__column" key={`tableau.${row}`} data-row={row}>
            <Pile store={store} layout={'FannedDown'} pileType={'Tableau'} pile={pile} tableauColumn={row}/>
          </div>
        ))
      }
    </div>
  )
};

Tableau.displayName = 'TableauComponent';
