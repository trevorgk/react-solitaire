/// <reference path="Constants.ts"/>
//
//declare module Cards {
//
//}
class Card {
    constructor(suit, rank) {
        this.show = true;
        this.suit = suit;
        this.rank = rank;
        this.joker = false;
    }
    getImageFile() {
        let filename = cardsDir + Suit[this.suit] + '/' + Rank[this.rank] + '.png';
        return filename.toLowerCase();
        //return 'img/cards/${this.suit}/${this.rank}';	wtb string interpolation
    }
    display() {
        if (!this.show) {
            return Card.backFace;
        }
        return this.getImageFile();
    }
    toString() {
        return Rank[this.rank] + " of " + Suit[this.suit];
    }
}
Card.backFace = cardsDir + 'back-purple.png';
class Joker extends Card {
    constructor() {
        super(null, null);
        this.joker = true;
    }
    toString() {
        return "Joker";
    }
    getImageFile() {
        return cardsDir + 'joker1.png';
    }
}
class DeckOfCards {
    //public length = this.cards.length;
    constructor(includeJokers = true) {
        //	default order
        this.suits = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
        this.ranks = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
        this.cards = [];
        this.suits.forEach((suit) => this.ranks.forEach((rank) => this.cards.push(new Card(suit, rank))));
        if (includeJokers) {
            this.cards.push(new Joker());
            this.cards.push(new Joker());
        }
    }
    //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let swap = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = swap;
        }
    }
    getNextCard() {
        return this.cards.pop();
    }
    toString() {
        return this.cards.join(", ");
    }
    length() {
        return this.cards.length;
    }
    push(card) {
        this.cards.push(card);
    }
    concat(cards) {
        this.cards = cards.concat(this.cards);
        return this;
    }
    deal(players, handSize = 0) {
        const maxPlayers = 4;
        if (players < 1 || players > 4) {
            throw new Error("Number of players must be between one and four.");
        }
        if (handSize && players * handSize > this.cards.length) {
            throw new Error("Not enough cards in pack for each player");
        }
        if (!handSize)
            handSize = Math.floor(this.cards.length / players);
        let hands = [];
        for (let i = 0; i < players; i++) {
            hands[i] = [];
        }
        for (let i = 0; i < handSize; i++) {
            for (let j = 0; j < players; j++) {
                hands[j][i] = this.cards.pop();
            }
        }
        return hands;
    }
}
class Player {
    constructor(hand, name = 'anon') {
        this.hand = hand;
        this.name = name;
    }
    toString() {
        return "Player '" + this.name + "' : {" + this.hand.join(", ") + "}";
    }
}
class GameOfCards {
    constructor(players, handSize = 0) {
        this.deck = new DeckOfCards(false);
        //this.players = new Array<Player>();
        var hands = this.deck.deal(players, handSize);
        this.players = hands.map(function (hand) {
            return new Player(hand);
        });
    }
    toString() {
        return this.players.join("\n") + "\nPack : {" + this.deck + "}";
    }
}
