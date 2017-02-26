import {KlondikeStore} from '../stores/KlondikeStore';
import {PlayingCard} from '../models/playingCards';

let store: KlondikeStore;
beforeEach(() => {
  store = KlondikeStore.init();
});

afterEach(() => {
});

beforeAll(() => {
});

afterAll(() => {
});

test('ascending number of cards in tableau with only top card visible', () => {
  const tableau = store.tableau;
  for (let i = 0; i < tableau.length; i++) {
    const pile = tableau[i];
    expect(pile.length).toBe(i + 1);
    for (let j = 0; j < pile.length; j++) {
      const card = pile[j];
      expect(card.show).toBe(j === i);  //  only the top card visible
    }
  }
});

test('after tableau, all remaining cards are in the pack', () => {
  let totalCardsInTableau = 0;
  for(var pile of store.tableau)
    totalCardsInTableau += pile.length;
    
  expect(store.stock.length).toBe(store.pack.size - totalCardsInTableau);
});


test('Can only put an ace and two of correct suit on empty foundation pile', () => {
  const kingOfDiamonds = new PlayingCard("King", "Diamonds");
  const aceOfSpades = new PlayingCard("Ace", "Spades");
  const twoOfSpades = new PlayingCard("Two", "Spades");

  expect(store.canMoveCard(kingOfDiamonds, store.foundations["Spades"], "Foundation", "Spades", 0)).toBe(false);
  expect(store.canMoveCard(twoOfSpades, store.foundations["Spades"], "Foundation", "Spades", 0)).toBe(false);
  expect(store.canMoveCard(aceOfSpades, store.foundations["Spades"], "Foundation", "Spades", 0)).toBe(true);
  store.foundations["Spades"].push(aceOfSpades);
  expect(store.canMoveCard(twoOfSpades, store.foundations["Spades"], "Foundation", "Spades", 0)).toBe(true);
});
