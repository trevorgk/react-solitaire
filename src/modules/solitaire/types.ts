import { PlayingCard, Suit } from '../../types';

export type PileType = 'Stock' | 'Waste' | 'Tableau' | 'Foundation';

export type DropTarget =
  | {
      pileType: 'Stock';
    }
  | {
      pileType: 'Waste';
    }
  | {
      pileType: 'Tableau';
      lane: number;
    }
  | {
      pileType: 'Foundation';
      suit: Suit;
    };

export type DragSource =
  | {
      pileType: 'Stock';
    }
  | {
      pileType: 'Waste';
      position: number;
    }
  | {
      pileType: 'Foundation';
      suit: Suit;
    }
  | {
      pileType: 'Tableau';
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
