import {KlondikeStore} from '../stores/KlondikeStore';


let store: KlondikeStore;
beforeEach(() => {
  console.log('beforeEach');
  store = KlondikeStore.init();
});

afterEach(() => {
  console.log('afterEach');
});

beforeAll(() => {
  console.log('beforeAll');
});

afterAll(() => {
  console.log('afterAll');
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

// test('Can only put an ace in empty foundation pile')