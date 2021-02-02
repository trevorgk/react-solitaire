import React from 'react';
import './styles.css';
import { PlayingCard } from '../../types';
import Pile from '../Pile/Pile';

interface Props {
  stockPile: Array<PlayingCard>;
  talon: Array<PlayingCard>;
  onStockClick?: () => void;
}

const Stock = ({ stockPile, talon, onStockClick }: Props) => {
  return (
    <div className="Stock">
      <Pile
        cards={stockPile}
        layout="Squared"
        onPileClick={onStockClick}
        className="stock"
      />
      <Pile cards={talon} layout="FannedRight" className="talon" />
    </div>
  );
};

export default Stock;
