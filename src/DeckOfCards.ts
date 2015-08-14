/// <reference path="Constants.ts"/>
/// <reference path="Card.ts"/>
/// <reference path="Joker.ts"/>
//
import Card = require('./Card');

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

    getNextCard(): Card {
        return this.cards.pop();
    }

    toString(): string {
        return this.cards.join(", ")
    }

    length(): number {
        return this.cards.length;
    }

    push(card:Card) {
        this.cards.push(card);
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
            hands[i] = [];
        }

        for (let i = 0; i < handSize; i++) {
            for (let j = 0; j < players; j++) {
                hands[j][i] = this.cards.pop();
            }
        }

        return hands;
    }
}/**
 * Created by lukas on 2015-08-15.
 */
