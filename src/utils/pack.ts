import produce from 'immer';

import { PlayingCard, suits, pips } from '../types';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffle = (pile: Array<PlayingCard>): Array<PlayingCard> =>
  produce(pile, (draftPile) => {
    let curr = draftPile.length;

    // while elements remain unshuffled ...
    while (curr > 0) {
      // pick a random element ...
      const randomIndex = Math.floor(Math.random() * curr);
      curr -= 1;

      // and swap with the current element.
      let temp = draftPile[curr];
      draftPile[curr] = draftPile[randomIndex];
      draftPile[randomIndex] = temp;
    }

    return draftPile;
  });

export const generatePack = (reveal = false): Array<PlayingCard> => {
  const pack: Array<PlayingCard> = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < pips.length; j++) {
      pack.push({
        suit: suits[i],
        pip: pips[j],
        reveal,
      });
    }
  }
  return shuffle(pack);
};
