import { PlayingCard, suits, pips } from '../types';

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

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffle = (pile: Array<PlayingCard>): Array<PlayingCard> => {
  let curr = pile.length;

  // while elements remain unshuffled ...
  while (curr > 0) {
    // pick a random element ...
    const randomIndex = Math.floor(Math.random() * curr);
    curr -= 1;

    // and swap with the current element.
    let temp = pile[curr];
    pile[curr] = pile[randomIndex];
    pile[randomIndex] = temp;
  }

  return pile;
};
