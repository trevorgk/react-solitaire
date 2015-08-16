let suit = null;
let rank = null;
let observer = null;

function emitChange() {
  observer(suit, rank);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveCard(toCard) {
  suit = toCard.suit;
  rank = toCard.rank;
  emitChange();
}

export function canMoveCard(toFoundation) {
  const rank = toCard.rank;
  const suit = toCard.suit;

  return true;
}
