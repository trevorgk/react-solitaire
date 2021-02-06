import produce from 'immer';
import { useState } from 'react';

import { PlayingCard, Foundation } from '../../types';
import { generatePack } from '../../utils/pack';
import FoundationComponent from '../Foundation/Foundation';
import Stock from '../Stock/Stock';
import './styles.css';

interface State {
  stock: Array<PlayingCard>;
  talon: Array<PlayingCard>;
  waste: Array<PlayingCard>;
  foundation: Foundation;
}

const GameBoard = () => {
  const [state, setState] = useState<State>({
    stock: generatePack(false).slice(0, 11),
    talon: [],
    waste: [],
    foundation: {
      Spades: [],
      Clubs: [],
      Diamonds: [],
      Hearts: [],
    },
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

  const { stock, talon, foundation } = state;
  return (
    <div className="GameBoard">
      <Stock stockPile={stock} talon={talon} onStockClick={onStockClick} />
      <FoundationComponent foundation={foundation} />
    </div>
  );
};

export default GameBoard;
