import * as React from 'react';
import {PileType, ItemType} from '../models/klondike';
import {PlayingCard} from '../models/playingCards';
import {assign} from 'lodash';
import {DragSource} from 'react-dnd';

interface Props {
  card: PlayingCard;
  pileType: PileType;
  style: Object;
  connectDragSource?: any;
  isDragging?: boolean;
}

const cardSource = {
  beginDrag: function (props) {
    console.log('begin drag');
    return {};
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export const KlondikeCard: React.ComponentClass<Props> = DragSource('Card', cardSource, collect) ((props: Props) => {
  const {
    card,
    pileType,
    connectDragSource,
    isDragging,
    style
  } = props;

  const newStyle = assign({}, style, {position: 'relative', width: 80, height: 112, opacity: isDragging ? 0.5 : 1});

  return connectDragSource(
    <div className="klondike-card" onClick={e => {
      card.show && console.log('card shown')
    }} style={newStyle}>
      <img draggable={true} onDragStart={e => {
        console.log(e);
      }} style={{
      width: '100%'
      }} src={card.display()}/>
      
    </div>
  )
})

KlondikeCard.displayName = 'KlondikeCardComponent';