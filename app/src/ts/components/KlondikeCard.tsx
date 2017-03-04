import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import {PileType, ItemType} from '../models/klondike';
import {PlayingCard, Suit} from '../models/playingCards';
import { PileProps } from './';
import {assign} from 'lodash/fp/object';
import {DragSource} from 'react-dnd';

export interface Props {
  store: KlondikeStore;
  card: PlayingCard;
  connectDragSource?: any;
  isDragging?: boolean;
  pilePosition: number;
  pileProps: PileProps;
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
    const dropResult: PileProps = monitor.getDropResult();

    console.log('dropped', dropResult);

    const { store, card, pilePosition, pileProps } = props;
    if (store.canMoveCard(card, dropResult))
      store.moveCard(props, dropResult)
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const pileTypeCssClassName = (pileType: PileType) => `pileType__${pileType.toLowerCase()}`;
const isDraggingCssClassName = (isDragging: boolean) => `${isDragging ? 'is-dragging' : ''}`;

export const KlondikeCard: React.ComponentClass<Props> = DragSource('Card', cardSource, collect) ((props: Props) => {
  const {
    card,
    connectDragSource,
    isDragging,
    pilePosition,
    pileProps
  } = props;

  const {
    pileType
  } = pileProps;
  
  return connectDragSource(
    <div className={`klondike-card-component ${isDraggingCssClassName(isDragging)} ${pileTypeCssClassName(pileType)}`} onClick={e => {
      card.show && console.log('card shown')
    }}>
      <img draggable={true} onDragStart={e => {
        console.log(e);
      }} className="mw-100" src={card.display()}/>
      
    </div>
  )
})

KlondikeCard.displayName = 'KlondikeCardComponent';