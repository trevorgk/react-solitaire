"use strict";
(function (Suit) {
    Suit[Suit["Spades"] = 0] = "Spades";
    Suit[Suit["Clubs"] = 1] = "Clubs";
    Suit[Suit["Diamonds"] = 2] = "Diamonds";
    Suit[Suit["Hearts"] = 3] = "Hearts";
})(exports.Suit || (exports.Suit = {}));
var Suit = exports.Suit;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Black"] = 1] = "Black";
})(exports.Color || (exports.Color = {}));
var Color = exports.Color;
(function (Rank) {
    Rank[Rank["Ace"] = 1] = "Ace";
    Rank[Rank["Two"] = 2] = "Two";
    Rank[Rank["Three"] = 3] = "Three";
    Rank[Rank["Four"] = 4] = "Four";
    Rank[Rank["Five"] = 5] = "Five";
    Rank[Rank["Six"] = 6] = "Six";
    Rank[Rank["Seven"] = 7] = "Seven";
    Rank[Rank["Eight"] = 8] = "Eight";
    Rank[Rank["Nine"] = 9] = "Nine";
    Rank[Rank["Ten"] = 10] = "Ten";
    Rank[Rank["Jack"] = 11] = "Jack";
    Rank[Rank["Queen"] = 12] = "Queen";
    Rank[Rank["King"] = 13] = "King";
})(exports.Rank || (exports.Rank = {}));
var Rank = exports.Rank;
(function (Layout) {
    Layout[Layout["Squared"] = 0] = "Squared";
    Layout[Layout["FannedDown"] = 1] = "FannedDown";
    Layout[Layout["FannedRight"] = 2] = "FannedRight";
})(exports.Layout || (exports.Layout = {}));
var Layout = exports.Layout;
class Card {
    constructor(suit, rank) {
        this.show = true;
        this.suit = suit;
        this.rank = rank;
        this.joker = false;
    }
    static getPip(suit) {
        let filename = 'pips/' + suit + '.svg';
        return filename.toLowerCase();
    }
    getImageFile() {
        let filename = 'cards/' + Suit[this.suit] + '/' + Rank[this.rank] + '.png';
        return filename.toLowerCase();
    }
    getColor() {
        return this.suit == Suit.Spades || this.suit == Suit.Clubs ? Color.Black : Color.Red;
    }
    display() {
        if (!this.show) {
            return Card.backFace;
        }
        return this.getImageFile();
    }
    setShow(show) {
        this.show = show;
    }
    toString() {
        return Rank[this.rank] + " of " + Suit[this.suit];
    }
}
Card.backFace = 'cards/back-purple.png';
exports.Card = Card;
class Joker extends Card {
    constructor() {
        super(null, null);
        this.joker = true;
    }
    toString() {
        return "Joker";
    }
    getImageFile() {
        return 'cards/' + 'joker1.png';
    }
}
exports.Joker = Joker;
class DeckOfCards {
    constructor(includeJokers = true) {
        this.suits = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
        this.ranks = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
        this.cards = [];
        this.suits.forEach((suit) => this.ranks.forEach((rank) => this.cards.push(new Card(suit, rank))));
        if (includeJokers) {
            this.cards.push(new Joker());
            this.cards.push(new Joker());
        }
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let swap = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = swap;
        }
    }
    getTopCard() {
        return this.cards.pop();
    }
    getBottomCard() {
        return this.cards.shift();
    }
    addTopCard(card) {
        this.cards.push(card);
    }
    addBottomCard(card) {
        this.cards.unshift(card);
    }
    getNextCards(n) {
        if (n > this.cards.length) {
            n = this.cards.length;
        }
        return this.cards.reverse().splice(0, n);
    }
    getRemainingCards(n) {
        let i = 0;
        let cards = this.cards.reverse();
        this.cards = [];
        return cards;
    }
    toString() {
        return this.cards.join(", ");
    }
    length() {
        return this.cards.length;
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
            hands[i] = new Array();
        }
        for (let i = 0; i < handSize; i++) {
            for (let j = 0; j < players; j++) {
                hands[j][i] = this.cards.pop();
            }
        }
        return hands;
    }
}
exports.DeckOfCards = DeckOfCards;
class Player {
    constructor(hand, name = 'anon') {
        this.hand = hand;
        this.name = name;
    }
    toString() {
        return "Player '" + this.name + "' : {" + this.hand.join(", ") + "}";
    }
}
exports.Player = Player;
class GameOfCards {
    constructor(players, handSize = 0) {
        this.deck = new DeckOfCards(false);
        var hands = this.deck.deal(players, handSize);
        this.players = hands.map(function (hand) {
            return new Player(hand);
        });
    }
    toString() {
        return this.players.join("\n") + "\nPack : {" + this.deck + "}";
    }
}
