import {Rank, NumericRank, Suit, Color, suitToColor} from './';

export class PlayingCard {
    show = true;
    readonly numericRank: number;
    readonly color: Color
    constructor(public rank: Rank, public suit: Suit) {
        this.numericRank = NumericRank(rank);
        this.color = suitToColor(suit);
    }
    public flip = () => {
        this.show = !this.show;

    }
    static backFace = '/assets/img/cards/back-purple.png';
    public toString = () => `${this.rank} of ${this.suit}`;
    public getImageFile = () => `/assets/img/cards/${this.suit}/${this.rank}.png`
}