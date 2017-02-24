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
    <div className="stock-component">
      <img src={PlayingCard.backFace} className="stock__trigger"
        onClick={(e) => {
          e.preventDefault();

          stockClicked();
        }} />
      <Pile store={store} layout={'FannedRight'} pileType={'Waste'} pile={waste}/>
    </div>
  )
})

Stock.displayName = 'StockComponent';