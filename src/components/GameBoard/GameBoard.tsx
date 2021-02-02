import produce from 'immer';
import { useState } from 'react';
import { PlayingCard } from '../../types';
import { generatePack } from '../../utils/pack';
import Stock from '../Stock/Stock';

interface State {
  stock: Array<PlayingCard>;
  talon: Array<PlayingCard>;
  waste: Array<PlayingCard>;
}
const GameBoard = () => {
  const [state, setState] = useState<State>({
    stock: generatePack(false).slice(0, 11),
    talon: [],
    waste: [],
  });

  const onStockClick = () => {
    setState((state) =>
      produce(state, (draft) => {
        const MAX = 3;
        draft.talon.forEach((card) => (card.reveal = false));
        draft.waste = draft.waste.concat(draft.talon);
        draft.talon = [];

        if (draft.stock.length === 0) {
          draft.stock = draft.stock.concat(draft.waste.reverse());
          draft.waste = [];

          return;
        }

        for (let i = 0; i < MAX; i++) {
          const card = draft.stock.pop();
          if (card) {
            card.reveal = true;
            draft.talon.push(card);
          }
        }
      }),
    );
    console.log({ waste: state.waste });
  };

  const { stock, talon } = state;
  return (
    <div className="GameBoard">
      <Stock stockPile={stock} talon={talon} onStockClick={onStockClick} />
    </div>
  );
};

export default GameBoard;
