import React from 'react';

import Pile from '../Pile/Pile';
import { useSolitaireContext } from '../../modules/solitaire/SolitaireContext';
import stockClicked from '../../modules/solitaire/producers/stockClicked';

import './styles.css';

const Stock = () => {
  const [gameState, setGameState] = useSolitaireContext();
  const { stock, waste } = gameState;

  const onStockClick = () => setGameState(stockClicked);

  return (
    <div className="Stock">
      <div className="StockPile">
        <Pile
          dropTarget={{
            pile: 'Stock',
          }}
          cards={stock}
          layout="Squared"
          onPileClick={onStockClick}
          className="stock"
        />
      </div>
      <Pile
        dropTarget={{
          pile: 'Waste',
        }}
        cards={waste}
        layout="FannedRight"
        className="talon"
      />
    </div>
  );
};

export default Stock;
