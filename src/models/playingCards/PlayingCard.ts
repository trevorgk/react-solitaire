import {Rank, Suit} from './';

export class PlayingCard {
    show = true;
    backface = 'static/card_faces/back-purple.png';
    constructor(public rank: Rank, public suit: Suit) {}
    public flip = () => {
        this.show = !this.show;
    }
    public display = () => this.show ? this.getImageFile() : this.backface;
    public toString = () => `${this.rank} of ${this.suit}`;
    public getImageFile = () => `static/card_faces/${this.suit}/${this.rank}.png`
}