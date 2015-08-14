/// <reference path="Constants.ts"/>
//
import Card = require('./Card');

export class Joker extends Card {
    constructor(){
        super(null,null);
        this.joker = true;
    }

    toString(): string {
        return "Joker";
    }

    getImageFile(): string {
        return cardsDir + 'joker1.png';
    }
}
