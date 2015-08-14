/// <reference path="Constants.ts"/>
//
import DeckOfCards = require('./DeckOfCards');
import Player = require('./Player');

export class GameOfCards {
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
