import { Pip, Suit, Colour, pips } from '../types';

const suitToColour = (suit: Suit): Colour =>
  suit === 'Clubs' || suit === 'Spades' ? 'Black' : 'Red';

export class PlayingCard {
  reveal = true;
  readonly numericRank: number;
  readonly colour: Colour;
  constructor(public pip: Pip, public suit: Suit) {
    this.numericRank = pips.indexOf(pip);
    this.colour = suitToColour(suit);
  }
  public flip = () => {
    this.reveal = !this.reveal;
  };
  static backFace = '/cards/back-purple.png';
  public toString = () =>
    this.reveal ? `${this.pip} of ${this.suit}` : 'hidden card';
  public getImageFile = () => `/cards/${this.suit}/${this.pip}.png`;
}
