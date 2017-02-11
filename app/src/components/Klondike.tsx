import * as React from 'react';
import {KlondikeStore} from '../stores/KlondikeStore';
import {PileLayout, PileType} from '../models/klondike';
import {PlayingCard} from '../models/playingCards';
import {observer} from 'mobx-react';
import {assign} from 'lodash';
import {Pile} from '.';

interface Props {
  store: KlondikeStore
}
export const Klondike = observer((props: Props) => {
  const {store} = props;
  const {numMoves, moves, undo, stockClicked, waste} = store;
  const displayMoveCount = () => (
    <div>
      {numMoves}&nbsp;{numMoves === 1
              ? 'move'
              : 'moves'}
    </div>
  )
  return (
    <div className="klondike">
      <div style={{
        width: '670px', margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          {displayMoveCount()}
          <div>
            <input type="button" value="undo latest" onClick={undo} disabled={!moves.length} />
          </div>
        </div>
        <div className="">
          <div className="">
            <div className="Stock" style={{
              width: '255px', margin: '10px 15px 0 20px', float: 'left'
            }}>
              <img src={PlayingCard.backFace}
                onClick={(e) => {
                  e.preventDefault();

                  stockClicked();
                }} style={{
                  width: '80px', height: '112px', cursor: 'pointer', float: 'left'
                }} />
              <Pile layout={'FannedRight'} pileType={'Waste'} pile={waste} pileStyle={{
                float: 'left',
                marginLeft: '75px'
              }} />
            </div>
          </div>
          <div>
            {/*<Foundation piles={foundationPiles} cardClicked={cardClicked} />*/}
          </div>
        </div>
        <div style={{
          padding: '20px 10px 0', float: 'right'
        }}>
          {/*<Tableau piles={tableauPiles} cardClicked={cardClicked}/>*/}
        </div>
      </div>
    </div>
  )
})