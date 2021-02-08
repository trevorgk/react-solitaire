import { Suit } from '../../../types';

export const getBackgroundImage = (suit: Suit) =>
  `url('${process.env.PUBLIC_URL}/pips/${suit.toLocaleLowerCase()}.svg')`;
