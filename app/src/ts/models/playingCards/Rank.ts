export type Rank = 'Ace' | 'Two' | 'Three' | 'Four' | 'Five' | 'Six' |
  'Seven' | 'Eight' | 'Nine' | 'Ten' | 'Jack' | 'Queen' | 'King';

export const NumericRank = (rank: Rank) => {
  switch (rank) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    case 'Ten':
      return 10;
    case 'Jack':
      return 11;
    case 'Queen':
      return 12;
    case 'King':
      return 13;
  }
}