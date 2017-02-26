import {Rank, NumericRank, Suit} from './';

export class PlayingCard {
    show = true;
    readonly numericRank: number;
    constructor(public rank: Rank, public suit: Suit) {
        this.numericRank = NumericRank(rank);
    }
    public flip = () => {
        this.show = !this.show;

    }
    static backFace = '/assets/img/cards/back-purple.png';
    public display = () => this.show ? this.getImageFile() : PlayingCard.backFace;
    public toString = () => `${this.rank} of ${this.suit}`;
    public getImageFile = () => `/assets/img/cards/${this.suit}/${this.rank}.png`
}