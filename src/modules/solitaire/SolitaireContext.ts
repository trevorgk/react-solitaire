import React from 'react';
import { GameState } from './types';
import setupGame from './utils/setupGame';

export const SolitaireContext = React.createContext<GameState>(setupGame());
