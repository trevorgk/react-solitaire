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
    <div>
      {
        piles.map((pile, row) => (
          <div className="Tableau" key={`tableau.${row}`} data-row={row}
            style={{
              position: 'relative',
              width: '80px',
              height: '112px',
              border: '1px solid #CCC',
              borderRadius: '5px',
              margin: '10px 5px',
              backgroundPosition: '18px 30px',
              float: 'left'
            }}>
            <Pile store={store} layout={'FannedDown'} pileType={'Tableau'} pile={pile} />
          </div>
        ))
      }
    </div>
  )
};

Tableau.displayName = 'TableauComponent';
