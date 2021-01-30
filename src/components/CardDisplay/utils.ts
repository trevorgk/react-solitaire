import { PlayingCard } from '../../types';

const BACKFACE = '/cards/back-purple.png';

export const getSrc = ({ reveal, suit, pip }: PlayingCard) =>
  reveal ? `/cards/${suit}/${pip}.png` : BACKFACE;

export const getAltText = ({ reveal, suit, pip }: PlayingCard) =>
  reveal ? `${pip} of ${suit}` : 'hidden card';
