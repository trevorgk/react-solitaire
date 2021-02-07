export const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'] as const;
export const pips = [
  'Ace',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Jack',
  'Queen',
  'King',
] as const;
export const colours = ['Red', 'Black'];

export type Pip = typeof pips[number];
export type Suit = typeof suits[number];
export type Colour = typeof colours[number];

export interface PlayingCard {
  reveal: boolean;
  suit: Suit;
  pip: Pip;
}

export type PileLayout = 'Squared' | 'FannedRight' | 'FannedDown';
