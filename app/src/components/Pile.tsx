import * as React from 'react';
import {KlondikeStore} from '../stores/KlondikeStore';
import {PileLayout, PileType} from '../models/klondike';
import {PlayingCard} from '../models/playingCards';
import {assign} from 'lodash';
import {observer} from 'mobx-react';
import {KlondikeCard} from '.';

interface Props {
  pile: Array<PlayingCard>;
  layout: PileLayout;
  pileType: PileType;
  pileStyle?: Object;
}

export const Pile: React.ClassicComponentClass<Props> = observer((props: Props) => {
  const {
    pile,
    layout,
    pileType
  } = props;

  let pileStyle = props.pileStyle || {};
  let cardStyle = {};
  switch (layout) {
    case 'Squared':
      pileStyle = assign(pileStyle, { position: 'relative', width: '80px', height: '112px' });
      cardStyle = assign(cardStyle, { position: 'absolute' });
      break;
    case 'FannedRight':
      pileStyle = assign(pileStyle, { margin: '0 5px' });
      cardStyle = assign(cardStyle, { float: 'left', marginLeft: '-65px' });
      break;
    case 'FannedDown':
    default:
      pileStyle = assign(pileStyle, { float: 'left', paddingTop: '95px' });
      cardStyle = assign(cardStyle, { marginTop: '-95px' });
      break;
  }

  return (
    <div className="Pile" style={pileStyle}>
      {pile && pile.map((card, pos) => <KlondikeCard key={pos} card={card} pileType={pileType} style={assign(cardStyle, { zIndex: pos })} />)}
    </div>
  )
})

Pile.displayName = 'PileComponent';