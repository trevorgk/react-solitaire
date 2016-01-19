import * as MoveTypes from 'constants/MoveTypes';
import * as PileTypes from 'constants/PileTypes';
import * as PlayingCards from 'models/PlayingCards';
const LOAD = 'redux-example/klondike/LOAD';
const LOAD_SUCCESS = 'redux-example/klondike/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/klondike/LOAD_FAIL';
const CARD_CLICKED = 'redux-example/klondike/CARD_CLICKED';
const CARD_DOUBLE_CLICKED = 'redux-example/klondike/CARD_DOUBLE_CLICKED';
const STOCK = 'redux-example/klondike/STOCK';
const UNDO = 'redux-example/klondike/UNDO';

export function cardClicked(target){
  return { type: CARD_CLICKED, target };
}

export function cardDoubleClicked(target){
  return { type: CARD_DOUBLE_CLICKED, target };
}

export function stock() {
  return { type: STOCK };
}

export function undo() {
  return { type: UNDO };
}

const initialState = {
    loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
          loaded: true,
          data: action.result,
          error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
          loaded: false,
          data: null,
          error: action.error
      };
    case CARD_CLICKED:
      console.log('processClick', action.target);
      if (state.data.active == null) {
        if (canSelect(state, action.target)) {
          return markSelected(state, action.target);
        }
        return state;
      } else if (state.data.active.card == action.target.card) {
        return resetSelection(state);
      } else {
        if (canMove(state, state.data.active, action.target)) {
          return processMove(state, state.data.active, action.target);
        } else {
          if (canSelect(state, action.target)){
            return markSelected(state, action.target);
          }
        }
      }
      return state;
    case CARD_DOUBLE_CLICKED:
      console.log('processDoubleClick', action.target);
      //state.data.foundationPiles[src.row];
      let src = action.target;
      let foundationPile = state.data.foundationPiles[src.card.suit];
      let card = foundationPile.length > 0 ? foundationPile[foundationPile.length - 1] : null;
      let dest = {
        pileType: PileTypes.FOUNDATION,
        row: src.card.suit,
        card
      };
      if (canMove(state, src, dest)) {
        return processMove(state, src, dest);
      }
      return state;
    case STOCK:
      let deck = [...[...state.data.waste].reverse(), ...state.data.deck];
      let move = {
        moveType: MoveTypes.FLIPFROMSTOCK,
        wasteSize: state.data.waste.length
      };
      const maxWasteSize = 3;//  todo this.props.wasteSize;
      let wasteSize = state.data.deck.length < maxWasteSize ? state.deck.data.length : maxWasteSize;
      let startPos = deck.length - wasteSize;
      let waste = [...deck.slice(startPos, deck.length)]
      deck = [...deck.slice(0, startPos)]
      if (state.data.active && state.data.active.pileType == PileTypes.WASTE) {
        state = resetSelection(state);
      }
      state = logMove(state, move);
      return {
        ...state,
        data: { ...state.data, waste, deck}
      };
    case UNDO:
      let moves = state.data.moves;
      if (moves.length == 0) {
        console.log('Nothing to undo...');
        return state;
      }
      let latestMove = moves[moves.length - 1];
      console.log('undo clicked', latestMove);

      let tableauPiles = state.data.tableauPiles;
      let foundationPiles = state.data.foundationPiles;

        let undoDeck = state.data.deck;
        let undoWaste = state.data.waste;
      switch (latestMove.moveType) {
        case MoveTypes.MOVECARD:
          let transplantCards = [];
          switch (latestMove.dest.pileType) {
            case PileTypes.EMPTYTABLEAU:
              let tableau = tableauPiles[latestMove.dest.row];
              transplantCards = tableau;
              break;
            case PileTypes.TABLEAUPILE:
              let tableauPile = tableauPiles[latestMove.dest.row];
              transplantCards = [...tableauPile.slice(latestMove.dest.pos + 1)];
              // tableauPile[tableauPile.length - 1].show = false;
              tableauPiles[latestMove.dest.row] = [...tableauPile.slice(0, latestMove.dest.pos + 1)]
              break;
            case PileTypes.WASTE:
              throw "Invalid undo source WASTE";
            case PileTypes.FOUNDATION:
              let foundationPile = foundationPiles[latestMove.dest.row];
              transplantCards = [...foundationPile[foundationPile.length - 1]];
              foundationPiles[latestMove.dest.row] = [...foundationPile.slice(0, foundationPile.length - 1)]
              break;
          }

          if (transplantCards.length == 0) {
            throw "Cards required for undo";
          }

          switch (latestMove.src.pileType) {
            case PileTypes.TABLEAUPILE:
              let tableauPile = tableauPiles[latestMove.src.row];
              if (latestMove.reveal) {
                  tableauPile[tableauPile.length - 1].show = false;
              }
              tableauPile = [...tableauPile, ...transplantCards];
              tableauPiles[latestMove.src.row] = tableauPile;
              break;
            case PileTypes.FOUNDATION:
              let foundationPile = foundationPiles[latestMove.src.row];
              foundationPile = [...foundationPile, ...transplantCards];
              foundationPiles[latestMove.src.row] = foundationPile;
              break;
            case PileTypes.WASTE:
              undoWaste = [...undoWaste, ...transplantCards];
              break;
          }
        //
        // case MoveTypes.FLIPFROMSTOCK:
        //   while (undoWaste.length > 0) {
        //     let transplant = [undoWaste.pop()];
        //     card.show = false;
        //     deck.addTopCard(card);
        //   }
        //   for (let i = 0; i < latestMove.wasteSize; i++) {
        //     let card = deck.getBottomCard();
        //     card.show = true; //i == wasteSize - 1;
        //     undoWaste.unshift(card);
        //   }
        //   break;
      }

      return {
        ...state,
        data: {
          ...state.data,
          moves: [...moves.slice(0, moves.length - 2)],
          waste:undoWaste,
          foundationPiles,
          tableauPiles,
          moveCount: state.data.moveCount - 1
        }
      }
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
    promise: (client) => client.get('/klondike/load/param1/param2') // params not used, just shown as demonstration
  };
}

function canSelect(state, target) {
  if (target.card == null) {
    return false;
  }
  switch (target.pileType) {
    case PileTypes.WASTE:
      return target.pos == state.data.waste.length - 1;
  }
  return true;
}

function markSelected(state, target) {
  return {
    ...state,
    data: {
      ...state.data,
      active: target
    }
  }
}

function resetSelection(state) {
  return {
    ...state,
    data: {
      ...state.data,
      active: null
    }
  }
}


function cardColour(card){
  return card.suit == PlayingCards.Suit.Spades || card.suit == PlayingCards.Suit.Clubs ? PlayingCards.Color.Black : PlayingCards.Color.Red;
}

function canMove(state, src, dest) {
  switch (dest.pileType) {
    case PileTypes.TABLEAUPILE:
      let tableau = state.data.tableauPiles[dest.row]
      return dest.pos == tableau.length - 1 && cardColour(src.card) != cardColour(dest.card) && src.card.rank == dest.card.rank - 1;
    case PileTypes.EMPTYTABLEAU:
      return src.card.rank == PlayingCards.Rank.King;
    case PileTypes.FOUNDATION:
      if (src.pileType == PileTypes.TABLEAUPILE && src.pos != state.data.tableauPiles[src.row].length - 1){
        //  user can only move the top tableau card to a foundation pile
        return false;
      }
      let tableauPile = state.data.tableauPiles[src.row];
      return src.card.suit == dest.row && (src.card.rank == PlayingCards.Rank.Ace || (dest.card && src.card.rank == dest.card.rank + 1));
    default:
      return false;
  }

}

function processMove(state, src, dest) {
  let foundationPiles = state.data.foundationPiles;
  let tableauPiles = state.data.tableauPiles;
  let waste = state.data.waste;
  let transplantCards = [];
  let move = {
    moveType: MoveTypes.MOVECARD,
    src,
    dest,
    reveal: false
  };
  switch (src.pileType) {
    case PileTypes.TABLEAUPILE:
      let tableauPile = tableauPiles[src.row];
      transplantCards = [...tableauPile.slice(src.pos)];
      tableauPile =  [...tableauPile.slice(0, src.pos)];
      if (tableauPile.length > 0) {
        let topCard = tableauPile[tableauPile.length - 1];
        if (!topCard.show) {
          let topCard = tableauPile[tableauPile.length - 1];
          topCard.show = move.reveal = true;
        }
        tableauPile = [...tableauPile.slice(0, tableauPile.length - 1), topCard];
      }
      tableauPiles[src.row] = tableauPile;
      break;
    case PileTypes.WASTE:
      transplantCards = [waste[waste.length - 1]];
      waste = [...waste.slice(0, waste.length - 1)];
      break;
    case PileTypes.FOUNDATION:
      let foundationPile = foundationPiles[src.row];
      transplantCards = [foundationPile[foundationPile.length - 1]];
      foundationPiles[src.row] = [...foundationPile.slice(0, foundationPile.length - 1)];
      break;
  }
  if (transplantCards.length == 0) {
    throw "Cards required for move";
  }
  switch (dest.pileType) {
    case PileTypes.TABLEAUPILE:
    case PileTypes.EMPTYTABLEAU:
      tableauPiles[dest.row] = [...tableauPiles[dest.row], ...transplantCards];
      break;
    case PileTypes.FOUNDATION:
      foundationPiles[dest.row] = [...foundationPiles[dest.row], ...transplantCards];
      break;
  }
  return {
    ...state,
    data: {
      ...state.data,
      foundationPiles,
      tableauPiles,
      waste,
      active: null,
      moves: [...state.data.moves, move],
      moveCount: state.data.moveCount + 1
    }
  }
  // this.setState({foundationPiles});
  return logMove(state, move);
}

function logMove(state, move) {
  return {
    ...state,
    data: {
      ...state.data,
      moves: [...state.data.moves, move],
      moveCount: state.data.moveCount + 1
    }
  }
}

function revealTopCard(pile) {
  if (pile.length == 0)
    return pile;

  let topCard = pile[pile.length - 1];
  topCard.show = true;

  return [...pile.slice(0, pile.length - 1), topCard]
}

//  todo keyboard commands
// handleKeyDown(e) {
//     var ESCAPE = 27;
//     if (e.keyCode == ESCAPE) {
//         resetSelection();
//     }
// }
//
