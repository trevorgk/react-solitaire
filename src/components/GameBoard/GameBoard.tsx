import React from 'react';

import Foundation from '../Foundation/Foundation';
import Tableau from '../Tableau/Tableau';
import Stock from '../Stock/Stock';
import { SolitaireProvider } from '../../modules/solitaire/SolitaireContext';

import './styles.css';

const GameBoard = () => {
  return (
    <SolitaireProvider>
      <div className="GameBoard">
        <div className="upper">
          <Stock />
          <Foundation />
        </div>
        <Tableau />
      </div>
    </SolitaireProvider>
  );
};

export default GameBoard;
