import * as PlayingCards from './playing-cards';

export const PileType = {
  EMPTYTABLEAU: 'tableau',
  TABLEAUPILE: 'tableauCard',
  FOUNDATION: 'foundation',
  WASTE: 'waste'
};

export interface ClickTarget {
  pileType: string,
  card: PlayingCards.Card,
  row?: number
  pos?: number
  pileSize?: number
}
