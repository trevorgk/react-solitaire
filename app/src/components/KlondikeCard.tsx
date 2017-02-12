import * as React from 'react';
import {PileType} from '../models/klondike';
import {PlayingCard} from '../models/playingCards';
import {assign} from 'lodash';

interface Props {
  card: PlayingCard;
  pileType: PileType;
  style: Object;
}

export const KlondikeCard: React.StatelessComponent<Props> = (props: Props) => {
  const {
    card,
    pileType
  } = props;

  let style = assign(props.style, {position: 'relative', width: 80, height: 112});

  return (
    <div className="klondike-card" onClick={e => {
      card.show && console.log('card shown')
    }} style={style}>
      <img style={{
      width: '100%'
      }} src={card.display()}/>
      
    </div>
  )
}

KlondikeCard.displayName = 'KlondikeCardComponent';