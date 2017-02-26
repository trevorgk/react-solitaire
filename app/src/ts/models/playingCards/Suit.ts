export type Suit = 'Spades' | 'Clubs' | 'Diamonds' | 'Hearts';

export type Color = 'Red' | 'Black';

export const suitToColor = (suit: Suit): Color => {
  switch (suit) {
    case 'Diamonds':
    case 'Hearts':
      return 'Red';
    case 'Spades':
    case 'Clubs': 
      return 'Black'
  }
}