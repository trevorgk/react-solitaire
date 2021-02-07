import produce from 'immer';
import { useState } from 'react';
import setupGame from '../../modules/solitaire/utils/setupGame';
import Foundation from '../Foundation/Foundation';
import Tableau from '../Tableau/Tableau';
import Stock from '../Stock/Stock';
import './styles.css';

const GameBoard = () => {
  const [state, setState] = useState(setupGame());

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

  const { stock, talon, foundation, tableau } = state;
  return (
    <div className="GameBoard">
      <div className="upper">
        <Stock stockPile={stock} talon={talon} onStockClick={onStockClick} />
        <Foundation foundation={foundation} />
      </div>
      <Tableau tableau={tableau} />
    </div>
  );
};

export default GameBoard;
