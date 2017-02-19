import * as React from 'react';
import { KlondikeStore } from '../stores/KlondikeStore';
import { Pile } from '.';
import { PileLayout, PileType } from '../models/klondike';
import { PlayingCard } from '../models/playingCards';
import { observer } from 'mobx-react';

interface Props {
  store: KlondikeStore
}

export const Stock: React.ClassicComponentClass<Props> = observer((props: Props) => {
  const {store} = props;
  const {
    stockClicked,
    waste
  } = store;
  return (
    <div className="stock" style={{
      width: '255px', margin: '10px 15px 0 20px', float: 'left'
    }}>
      <img src={PlayingCard.backFace}
        onClick={(e) => {
          e.preventDefault();

          stockClicked();
        }} style={{
          width: '80px', height: '112px', cursor: 'pointer', float: 'left'
        }} />
      <Pile store={store} layout={'FannedRight'} pileType={'Waste'} pile={waste} pileStyle={{
        float: 'left',
        marginLeft: '75px'
      }} />
    </div>
  )
})

Stock.displayName = 'StockComponent';