import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { PileLayout, PileType } from '../models/klondike';
import { PlayingCard } from '../models/playingCards';
import { observer } from 'mobx-react';
import { assign, flowRight } from 'lodash';
import { Pile, Header, Stock, Foundation, Tableau } from '.';
import { DragDropContext } from 'react-dnd';
const HTML5Backend = require('react-dnd-html5-backend');

interface Props {
  store: KlondikeStore
}

const modifier = flowRight(observer, DragDropContext(HTML5Backend))

export const Klondike = modifier((props: Props) => {
  const {store} = props;
  const {numMoves, moves, undo, stockClicked, waste} = store;
  
  return (
    <div className="klondike-component">
      <Header store={store} />
      <div className="">
        <Stock store={store} />
        <Foundation store={store} />
      </div>
      <Tableau store={store} />
    </div>
  )
})

Klondike.displayName = 'KlondikeComponent';