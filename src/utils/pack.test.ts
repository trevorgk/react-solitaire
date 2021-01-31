import { pips, PlayingCard } from '../types';
import { shuffle, generatePack } from './pack';

describe('shuffle', () => {
  it('generates a new array', () => {
    const pile: Array<PlayingCard> = pips.map((pip) => ({
      pip,
      suit: 'Hearts',
      reveal: true,
    }));
    const shuffledPile = shuffle(pile);
    expect(shuffledPile).not.toEqual(pile);
  });
});

describe('generatePack', () => {
  it('produces a pack with the expected number of cards, and', () => {
    expect(generatePack()).toHaveLength(52);
  });
  it('they are not all the same card', () => {
    const pack = generatePack();
    expect(pack[0]).not.toEqual(pack[pack.length - 1]);
  });
});
