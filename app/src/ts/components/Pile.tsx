import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { PileLayout, PileType, ItemType } from '../models/klondike';
import { PlayingCard } from '../models/playingCards';
import { assign, flowRight } from 'lodash';
import { observer } from 'mobx-react';
import { KlondikeCard } from '.';
import { DropTarget } from 'react-dnd';

export interface Props {
  store: KlondikeStore
  pile: Array<PlayingCard>;
  layout: PileLayout;
  pileType: PileType;
  pileStyle?: Object;
  isOver?: boolean;
  connectDropTarget?: any;
}

const pileTarget = {
  drop(props: Props, monitor, component) {
    const {store, pileType, pile} = props;
    console.log('drop', component);
    return {pileType, pile};
  },
  canDrop(props: Props) {
    const {store, pileType, pile} = props;
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
    connectDropTarget
  } = props;

  let pileStyle = props.pileStyle || {};
  let cardStyle = {};

  const renderPile = !!pile && pile.length;

  return connectDropTarget(
    <div className={`pile-component ${pileLayoutCssClass(layout)}`}>
      {renderPile ? 
        pile.map((card, pos) => 
          <KlondikeCard store={store} key={pos} card={card} pileType={pileType} pilePosition={pos} />)
        : <div className="pile__empty"></div>
      }
      {isOver &&
        <div className="pile__drag-overlay mw-100 mh-100" ></div>
      }
    </div>
  )
})

Pile.displayName = 'PileComponent';