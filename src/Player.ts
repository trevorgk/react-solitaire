import Card = require('./Card');

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