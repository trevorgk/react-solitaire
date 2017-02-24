import {PlayingCard} from './PlayingCard';

export class JokerCard extends PlayingCard {
    constructor() {
        super(null, null);
    }
    public toString = () => 'Joker';
    public getImageFile = () => `static/card_faces/joker1.png`
}
