import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { PileLayout, PileType, ItemType } from '../models/klondike';
import { PlayingCard, Suit } from '../models/playingCards';
import { assign, flowRight } from 'lodash/fp';
import { observer } from 'mobx-react';
import { KlondikeCard } from '.';
import { DropTarget } from 'react-dnd';

export interface Props {
  store: KlondikeStore;
  pile: Array<PlayingCard>;
  layout: PileLayout;
  pileType: PileType;
  pileStyle?: Object;
  isOver?: boolean;
  connectDropTarget?: any;
  foundationSuit?: Suit;
  tableauColumn?: number;
}

const pileTarget = {
  drop(props: Props, monitor, component) {
    const {store, pileType, pile, foundationSuit, tableauColumn} = props;
    // console.log('drop', component);
    return {pileType, pile, foundationSuit, tableauColumn};
  },
  canDrop(props: Props, monitor) {
    const {store, pileType, pile} = props;
    // console.log('canDrop', monitor.getItem().toString());
    return pileType !== 'Waste';
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const pileLayoutCssClass = (layout: PileLayout) => `pile-layout__${layout.toLowerCase()}`

const modifier = flowRight(DropTarget('Card', pileTarget, collect), observer);

export const Pile: React.ClassicComponentClass<Props> = modifier((props: Props) => {
  const {
    store,
    pile,
    layout,
    pileType,
    isOver,
    connectDropTarget,
    foundationSuit,
    tableauColumn
  } = props;

  let pileStyle = props.pileStyle || {};
  let cardStyle = {};

  const renderPile = !!pile && pile.length;

  return connectDropTarget(
    <div className={`pile-component ${pileLayoutCssClass(layout)}`}>
      {renderPile ? 
        pile.map((card, pos) => 
          <KlondikeCard store={store} key={pos} card={card} pileProps={props} pilePosition={pos} />)
        : <div className="pile__empty"></div>
      }
      {isOver &&
        <div className="pile__drag-overlay mw-100 mh-100" ></div>
      }
    </div>
  )
})

Pile.displayName = 'PileComponent';