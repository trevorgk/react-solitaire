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

  export function canMove(src:ClickTarget, dest: ClickTarget) : boolean{
      switch(dest.pileType){
        case PileType.TABLEAUPILE:
          return dest.pos == dest.pileSize - 1 && src.card.getColor() != dest.card.getColor() && src.card.rank == dest.card.rank - 1;
        case PileType.EMPTYTABLEAU:
          return src.card.rank == PlayingCards.Rank.King;
        case PileType.FOUNDATION:
          if (src.pileType == PileType.TABLEAUPILE && src.pos != src.pileSize - 1) return false;
          return src.card.suit == dest.row && (
            (src.card.rank == PlayingCards.Rank.Ace) || (dest.card && src.card.rank == dest.card.rank + 1));
        default:
          return false;
      }
      return false;
    }
