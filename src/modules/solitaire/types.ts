import { PlayingCard, Suit } from '../../types';

export interface GameState {
  stock: Array<PlayingCard>;
  talon: Array<PlayingCard>;
  waste: Array<PlayingCard>;
  foundation: Record<Suit, Array<PlayingCard>>;
  tableau: Record<number, Array<PlayingCard>>;
}
