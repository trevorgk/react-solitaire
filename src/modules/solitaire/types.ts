import { PlayingCard, Suit } from '../../types';

export type PileType = 'Stock' | 'Waste' | 'Tableau' | 'Foundation';

export type DropTarget =
  | {
      pile: 'Stock';
    }
  | {
      pile: 'Waste';
    }
  | {
      pile: 'Tableau';
      lane: number;
    }
  | {
      pile: 'Foundation';
      suit: Suit;
    };

export type DragSource =
  | {
      pile: 'Stock';
    }
  | {
      pile: 'Waste';
      position: number;
    }
  | {
      pile: 'Foundation';
      suit: Suit;
    }
  | {
      pile: 'Tableau';
      lane: number;
      position: number;
    };

export interface GameState {
  stock: Array<PlayingCard>;
  talon: Array<PlayingCard>;
  waste: Array<PlayingCard>;
  foundation: Record<Suit, Array<PlayingCard>>;
  tableau: Record<number, Array<PlayingCard>>;
}
