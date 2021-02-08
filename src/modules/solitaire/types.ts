import { PlayingCard, Suit } from '../../types';

export type PileType = 'Stock' | 'Waste' | 'Tableau' | 'Foundation';

export type DropTarget =
  | {
      pile: 'Waste' | 'Stock';
    }
  | {
      pile: 'Foundation';
      suit: Suit;
    }
  | {
      pile: 'Tableau';
      lane: number;
    };

export type DragSource =
  | {
      pile: 'Waste' | 'Stock';
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
