import produce from 'immer';
import React from 'react';

import Pile from '../Pile/Pile';
import { useSolitaireContext } from '../../modules/solitaire/SolitaireContext';
import './styles.css';

const Stock = () => {
  const [gameState, setGameState] = useSolitaireContext();
  const { stock, talon } = gameState;

  const onStockClick = () => {
    setGameState((gameState) =>
      produce(gameState, (draft) => {
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
  };

  return (
    <div className="Stock">
      <div className="StockPile">
        <Pile
          cards={stock}
          layout="Squared"
          onPileClick={onStockClick}
          className="stock"
        />
      </div>
      <Pile cards={talon} layout="FannedRight" className="talon" />
    </div>
  );
};

export default Stock;
