const LOAD = 'redux-example/klondike/LOAD';
import * as PlayingCards from '../../models/playing-cards';

const initialState =  (() => {
    let deck = new PlayingCards.DeckOfCards(false);
    deck.shuffle();

    let initialDeckSize = deck.length();

    let tableauPiles = (function(pileCount: number, deck: PlayingCards.DeckOfCards) {
      let piles = [];
      for (let i = 0; i < pileCount; i++) {
          for (let j = pileCount - 1; j >= i; j--) {
              if (!piles[j]) {
                  piles[j] = [];
              }
              let card = deck.getTopCard();
              card.show = j == i;

              piles[j].push(card);
          }
      }
      return piles;
    })(7, deck);

    let foundationPiles = (function() {
      return [[],[],[],[]];
    })();

    return {deck, tableauPiles, foundationPiles, moves: [], moveCount:0, waste: [], initialDeckSize};
  })();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.klondike && globalState.klondike.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widget/load/param1/param2') // params not used, just shown as demonstration
  };
}
