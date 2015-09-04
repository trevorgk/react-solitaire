import * as PlayingCards from './playing-cards';

export const PileType = {
  EMPTYTABLEAU: 'tableau',
  TABLEAUPILE: 'tableauCard',
  FOUNDATION: 'foundation',
  STOCK: 'stock'
};

export interface ClickTarget {
  pileType: string,
  card: PlayingCards.Card,
  row?: number
  pos?: number
}
