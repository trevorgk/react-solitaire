import { Suit } from '../../../types';

export const getBackgroundImage = (suit: Suit) =>
  `url('/pips/${suit.toLocaleLowerCase()}.svg')`;
