export enum Suit { Spades, Clubs, Diamonds, Hearts }
export enum Color { Red, Black }
export enum Rank { Ace = 1, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }
export enum Layout { Squared, FannedDown, FannedRight }	//todo FannedUp, FannedDown

export class Card {
  public joker: boolean;
  public suit: Suit;
  public rank: Rank;
	public show = true;
	static backFace = 'cards/back-purple.png';

  static getPip(suit: string) : string {
    let filename = 'pips/' + suit + '.svg';
    return filename.toLowerCase();
  }

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
    this.joker = false;
  }

  getImageFile(): string {
    let filename = 'cards/' + Suit[this.suit] + '/' + Rank[this.rank] + '.png';
    return filename.toLowerCase();
    //return 'static/cards/${this.suit}/${this.rank}';	wtb string interpolation
  }


  getColor(): Color {
    return this.suit == Suit.Spades || this.suit == Suit.Clubs ? Color.Black : Color.Red;
  }

	display(): string{
			if (!this.show){
				return Card.backFace;
			}

			return this.getImageFile();
	}
  toString(): string {
    return Rank[this.rank] + " of " + Suit[this.suit];
  }
}

export class Joker extends Card {
	constructor(){
		super(null,null);
		this.joker = true;
	}

	toString(): string {
		return "Joker";
	}

  getImageFile(): string {
		return 'cards/' + 'joker1.png';
	}
}

export class DeckOfCards {
  //	default order
  suits: Suit[] = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
  ranks: Rank[] = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
  cards: Card[] = [];
  //public length = this.cards.length;

 	constructor(includeJokers: boolean = true) {
    this.suits.forEach((suit) =>
      this.ranks.forEach((rank) =>
        this.cards.push(new Card(suit, rank))));

    if (includeJokers) {
      this.cards.push(new Joker());
      this.cards.push(new Joker());
    }
 	}

 	//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
	    	let j = Math.floor(Math.random() * (i + 1));
		    let swap = this.cards[i];
		    this.cards[i] = this.cards[j];
		    this.cards[j] = swap;
    }
 	}

  getTopCard(): Card {
    return this.cards.pop();
  }

  getBottomCard(): Card {
    return this.cards.shift();
  }

  addTopCard(card:Card) {
    this.cards.push(card);
  }

  addBottomCard(card:Card) {
    this.cards.unshift(card);
  }

  getNextCards(n: number): Card[] {
    if (n > this.cards.length) {
      n = this.cards.length;
    }
    return this.cards.reverse().splice(0, n);
  }

  toString(): string {
    return this.cards.join(", ")
  }

  length(): number {
    return this.cards.length;
  }

  concat(cards: Card[]): DeckOfCards{
    this.cards = cards.concat(this.cards);
    return this;
  }

  deal(players: number, handSize: number = 0): Card[][] {
    const maxPlayers = 4;

    if (players < 1 || players > 4) {
      throw new Error("Number of players must be between one and four.")
    }

    if (handSize && players * handSize > this.cards.length) {
      throw new Error("Not enough cards in pack for each player")
    }

    if (!handSize) handSize = Math.floor(this.cards.length / players);
    let hands: Card[][] = [];

    for (let i = 0; i < players; i++) {
      hands[i] = new Array<Card>();
    }

    for (let i = 0; i < handSize; i++) {
      for (let j = 0; j < players; j++) {
        hands[j][i] = this.cards.pop();
      }
    }

    return hands;
  }
}

export class Player {
  hand: Card[];
  name: string;

  constructor(hand: Card[], name = 'anon') {
    this.hand = hand;
    this.name = name;
  }

  toString(): string {
    return "Player '" + this.name + "' : {" + this.hand.join(", ") + "}";
  }
}

class GameOfCards {
  deck: DeckOfCards;
  players: Player[];

  constructor(players: number, handSize: number = 0) {
    this.deck = new DeckOfCards(false);

    //this.players = new Array<Player>();
    var hands = this.deck.deal(players, handSize);

    this.players = hands.map(function(hand) {
      return new Player(hand);
    });
  }

  toString(): string {
    return this.players.join("\n") + "\nPack : {" + this.deck + "}";
  }
}
