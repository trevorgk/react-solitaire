import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { PileLayout, PileType, ItemType } from '../models/klondike';
import { PlayingCard } from '../models/playingCards';
import { assign, flowRight } from 'lodash';
import { observer } from 'mobx-react';
import { KlondikeCard } from '.';
import { DropTarget } from 'react-dnd';

interface Props {
  pile: Array<PlayingCard>;
  layout: PileLayout;
  pileType: PileType;
  pileStyle?: Object;
  isOver?: boolean;
  connectDropTarget?: any;
}

const pileTarget = {
  drop: (props) => {
    console.log('drop', props);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const modifier = flowRight(DropTarget('Card', pileTarget, collect), observer);

export const Pile: React.ClassicComponentClass<Props> = modifier((props: Props) => {
  const {
    pile,
    layout,
    pileType,
    isOver,
    connectDropTarget
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

  pileStyle = assign(pileStyle, {
    position: 'relative'
  });

  return connectDropTarget(
    <div className="pile" style={pileStyle}>
      {pile && pile.map((card, pos) => <KlondikeCard key={pos} card={card} pileType={pileType} style={assign(cardStyle, { zIndex: pos })} />)}
      {isOver &&
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 100,
          opacity: 0.5,
          backgroundColor: 'yellow',
        }} />
      }
    </div>
  )
})

Pile.displayName = 'PileComponent';