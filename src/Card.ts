/// <reference path="Constants.ts"/>
//
export class Card {
    joker: boolean;
    suit: Suit;
    rank: Rank;
    public show = true;

    constructor(suit: Suit, rank: Rank) {
        this.suit = suit;
        this.rank = rank;
        this.joker = false;
    }

    getImageFile(): string {
        let filename = cardsDir + Suit[this.suit] + '/' + Rank[this.rank] + '.png';
        return filename.toLowerCase();
        //return 'img/cards/${this.suit}/${this.rank}';	wtb string interpolation
    }

    display(): string{
        if (!this.show){
            return cardsDir + 'back-purple.png';
        }

        return this.getImageFile();
    }
    toString(): string {
        return Rank[this.rank] + " of " + Suit[this.suit];
    }
}