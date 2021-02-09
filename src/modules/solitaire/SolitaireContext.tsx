import React, { useState } from 'react';

import { GameState } from './types';
import setupGame from './utils/setupGame';

interface ProviderProps {
  children: React.ReactNode;
}

export const SolitaireContext = React.createContext<
  [GameState, React.Dispatch<React.SetStateAction<GameState>>] | undefined
>(undefined);

export const SolitaireProvider = ({ children }: ProviderProps) => {
  const [gameState, setGameState] = useState(setupGame());

  return (
    <SolitaireContext.Provider value={[gameState, setGameState]}>
      {children}
    </SolitaireContext.Provider>
  );
};

export const useSolitaireContext = () => {
  const context = React.useContext(SolitaireContext);

  if (context === undefined) {
    throw new Error(
      'useSolitaireContext must be used within a SolitaireProvider',
    );
  }

  return context;
};
