import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import {PileType, ItemType} from '../models/klondike';
import {PlayingCard} from '../models/playingCards';
import {assign} from 'lodash';
import {DragSource} from 'react-dnd';

interface Props {
  store: KlondikeStore;
  card: PlayingCard;
  pileType: PileType;
  connectDragSource?: any;
  isDragging?: boolean;
  pilePosition: number;
}

const cardSource = {
  beginDrag(props) {
    console.log('begin drag');
    return {};
  },
  endDrag(props: Props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();

    console.log('dropped', dropResult);

    const { store, card } = props;
    const { pile } = dropResult;
    store.moveCard(card, pile)
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const pileTypeCssClassName = (pileType: PileType) => `pileType__${pileType.toLowerCase()}`

export const KlondikeCard: React.ComponentClass<Props> = DragSource('Card', cardSource, collect) ((props: Props) => {
  const {
    card,
    pileType,
    connectDragSource,
    isDragging,
    pilePosition
  } = props;

  return connectDragSource(
    <div className={`klondike-card-component ${isDragging ? 'is-dragging' : ''} ${pileTypeCssClassName(pileType)}`} onClick={e => {
      card.show && console.log('card shown')
    }}>
      <img draggable={true} onDragStart={e => {
        console.log(e);
      }} className="mw-100" src={card.display()}/>
      
    </div>
  )
})

KlondikeCard.displayName = 'KlondikeCardComponent';