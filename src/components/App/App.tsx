import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import GameBoard from '../GameBoard/GameBoard';
import './styles.css';

const App = () => (
  <div className="App">
    <DndProvider backend={HTML5Backend}>
      <GameBoard />
    </DndProvider>
  </div>
);

export default App;
