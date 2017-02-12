import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { PileLayout, PileType } from '../models/klondike';
import { PlayingCard } from '../models/playingCards';
import { observer } from 'mobx-react';
import { assign } from 'lodash';
import { Pile, Header, Stock, Foundation, Tableau } from '.';

interface Props {
  store: KlondikeStore
}

export const Klondike = observer((props: Props) => {
  const {store} = props;
  const {numMoves, moves, undo, stockClicked, waste} = store;
  
  return (
    <div className="klondike">
      <div style={{
        width: '670px', margin: '0 auto'
      }}>
        <Header store={store} />
        <div className="">
          <Stock store={store} />
          <div>
            <Foundation store={store}/>
          </div>  
        </div>
        <div style={{
          padding: '20px 10px 0', float: 'right'
        }}>
          <Tableau store={store} />
        </div>
      </div>
    </div>
  )
})

Klondike.displayName = 'KlondikeComponent';