import {PackOfCards, PlayingCard, Suit} from '../models/playingCards';
import {Foundation, PileType} from '../models/klondike';
import {observable} from 'mobx';
import {PileProps} from '../components'

const klondikeConfiguration = {
  tableauCount: 7
}

export class KlondikeStore {
  @observable pack: PackOfCards;
  @observable stock: PlayingCard[];
  @observable waste: PlayingCard[];
  @observable foundations: Foundation;
  @observable tableau: PlayingCard[][];
  @observable numMoves: number; //  cannot use moves.length, as numMoves also includes undos
  @observable moves = [];

  /**
   *
   */
  private constructor() {
    this.stockClicked = this.stockClicked.bind(this);
    this.undo = this.undo.bind(this);
    this.setupGame = this.setupGame.bind(this);
  }

  public static init() {
    const store = new KlondikeStore();
    store.pack = new PackOfCards();

    store.setupGame();
    return store;
  }  

  setupGame() {
    let cards = this.pack.cards;

    this.tableau = [];
    
    for (let i = 0; i < klondikeConfiguration.tableauCount; i++) {
      this.tableau.push([]);
    }
    
    for (let i = 0; i < klondikeConfiguration.tableauCount; i++) {
      let firstCard = true;
      for (let j = i; j < klondikeConfiguration.tableauCount; j++) {
        let card = cards.pop();
        card.show = firstCard;
        this.tableau[j].push(card);

        firstCard = false;
      }
    }
    
    this.foundations = {
      'Spades': new Array<PlayingCard>(),
      'Clubs': new Array<PlayingCard>(),
      'Diamonds': new Array<PlayingCard>(),
      'Hearts': new Array<PlayingCard>(),
    }

    this.stock = cards;
    this.numMoves = 0;
    this.moves = [];
  }

  undo() {
    console.log('undo');
  } 

  stockClicked() {
    this.waste = [this.stock.pop(), this.stock.pop(), this.stock.pop()];
  }

  canMoveCard(card: PlayingCard, pile: Array<PlayingCard>, targetPileType: PileType,
    foundationSuit?: Suit, tableauColumn?: number) {
      if (!card.show) return false;

      switch (targetPileType) {
        case 'Tableau':
          if (!tableauColumn) throw new Error('Tableau column number wasn\'t supplied');
          const targetColumn = this.tableau[tableauColumn];
          if (targetColumn.length === 0) return true;
          const topCard = targetColumn[targetColumn.length - 1];
          return topCard.numericRank === card.numericRank - 1 && 
            this.areAlternatingSuits(topCard, card);
        case 'Foundation':
          if (!foundationSuit) throw new Error('Foundation suit not supplied');
          if (card.suit !== foundationSuit) return false;
          if (pile.length === 0) { 
            if (card.rank === 'Ace') return true;
            return false;
          }
          const targetCard = pile[pile.length - 1];
          return targetCard.numericRank === card.numericRank - 1;
      }
    return false;
  }

  moveCard(src: PlayingCard, pile: Array<PlayingCard>) {
    pile.push(src);
  }

  areAlternatingSuits(first: PlayingCard, second: PlayingCard) {
    switch (first.suit) {
      case 'Spades':
      case 'Clubs':
        return second.suit === 'Hearts' || second.suit === 'Diamonds';
      case 'Diamonds':
      case 'Hearts':
        return second.suit === 'Spades' || second.suit === 'Clubs';
      
    }
  }
}