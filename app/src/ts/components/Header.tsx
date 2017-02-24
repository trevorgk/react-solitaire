import * as React from 'react';
import {KlondikeStore} from '../stores/KlondikeStore';

interface Props {
  store: KlondikeStore
}

const displayMoveCount = (numMoves: number) => (
  <div>
    {numMoves}&nbsp;{numMoves === 1
      ? 'move'
      : 'moves'}
  </div>
)

export const Header: React.StatelessComponent<Props> = ({store}) => {
  const {
    numMoves,
    undo,
    moves
  } = store;

  return (
    <div style={{
      textAlign: 'center'
    }}>
      {displayMoveCount(numMoves)}
      <div>
        <input type="button" value="undo latest" onClick={undo} disabled={!moves.length} />
      </div>
    </div>
)}

Header.displayName = 'HeaderComponent';