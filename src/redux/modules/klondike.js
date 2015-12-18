import * as MoveTypes from '../../constants/MoveTypes';
import * as PileTypes from '../../constants/PileTypes';

const LOAD = 'redux-example/klondike/LOAD';
const LOAD_SUCCESS = 'redux-example/klondike/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/klondike/LOAD_FAIL';
const CARD_CLICKED = 'redux-example/klondike/CARD_CLICKED';
const CARD_DOUBLE_CLICKED = 'redux-example/klondike/CARD_DOUBLE_CLICKED';
const STOCK = 'redux-example/klondike/STOCK';
const UNDO = 'redux-example/klondike/UNDO';

export function cardClicked(clickTarget){
  return { type: CARD_CLICKED, clickTarget };
}

export function cardDoubleClicked(clickTarget){
  return { type: CARD_DOUBLE_CLICKED, clickTarget };
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
      console.log('processClick', target);
      if (this.state.data.src == null && target.card != null) {
        if (KlondikeCard.canSelect(target)) {
          markSelected(target);
        }
      } else if (this.state.data.src.card == target.card) {
        resetSelection();
      } else {
        if (KlondikeCard.canMove(this.state.data.src, target)) {
          processMove(this.state.data.src, target);
        } else {
          markSelected(target);
        }
      }
      return {};
    case CARD_DOUBLE_CLICKED:
      console.log('processDoubleClick', src);
      this.state.data.foundationPiles[src.row];
      var foundationPile = this.state.data.foundationPiles[src.card.suit];
      let card = foundationPile.length > 0 ? foundationPile[foundationPile.length - 1] : null;
      let target = {
        pileType: PileTypes.FOUNDATION,
        row: src.card.suit,
        card
      };
      if (KlondikeCard.canMove(src, target)) {
        processMove(src, target);
      }
      return {};
    case STOCK:
      let deck = state.data.deck.concat(state.data.waste.reverse());
      let move = {
        moveType: MoveTypes.FLIPFROMSTOCK,
        wasteSize: state.data.waste.length
      };
      const maxWasteSize = 3;//  todo this.props.wasteSize;
      let wasteSize = state.data.deck.length < maxWasteSize ? state.deck.data.length : maxWasteSize;
      let waste = [];
      for (let i = 0; i < wasteSize; i++) {
        let card = deck.pop();
        card.show = true; //i == wasteSize - 1;
        waste.push(card);
      }
      return {
        ...state,
        data: { ...state.data, waste, deck}
      };
      if (state.data.src && state.data.src.pileType == PileTypes.WASTE) {
        resetSelection();
      }
      this.logMove(move);
      return {};
    case UNDO:
      let moveHistory = this.state.data.moveHistory;
      if (moveHistory.length == 0) {
        alert('Nothing to undo...');
        return;
      }
      let latestMove = moveHistory.pop();
      console.log('undo clicked', latestMove);
      let tableauPiles = this.state.data.tableauPiles;
      switch (latestMove.moveType) {
        case MoveTypes.MOVECARD:
          let transplantCards = [];
          switch (latestMove.dest.pileType) {
            case PileTypes.EMPTYTABLEAU:
              transplantCards = [this.state.data.tableauPiles[latestMove.dest.row].pop()];
              break;
            case PileTypes.TABLEAUPILE:
              let tableauPile = this.state.data.tableauPiles[latestMove.dest.row];
              transplantCards = tableauPile.splice(latestMove.dest.pos + 1, tableauPile.length - latestMove.dest.pos);
              break;
            case PileTypes.WASTE:
              throw "Invalid undo source WASTE";
            case PileTypes.FOUNDATION:
              transplantCards = [this.state.data.foundationPiles[latestMove.dest.row].pop()];
              break;
          }
          if (transplantCards.length == 0) {
            throw "Cards required for undo";
          }
          switch (latestMove.src.pileType) {
            case PileTypes.TABLEAUPILE:
              let tableauPile = this.state.data.tableauPiles[latestMove.src.row];
              if (latestMove.reveal) {
                tableauPile[tableauPile.length - 1].show = false;
              }
              tableauPile = tableauPile.concat(transplantCards);
              this.state.data.tableauPiles[latestMove.src.row] = tableauPile;
              break;
            case PileTypes.FOUNDATION:
              this.state.data.foundationPiles[latestMove.src.row] = this.state.data.foundationPiles[latestMove.src.row].concat(transplantCards);
              break;
            case PileTypes.WASTE:
              this.state.data.waste = this.state.data.waste.concat(transplantCards);
              break;
          }

          this.setState({
            moveHistory, moveCount: this.state.data.moveCount + 1
          });
          break;
        case MoveTypes.FLIPFROMSTOCK:
          let deck = this.state.data.deck;
          let waste = this.state.data.waste;
          while (waste.length > 0) {
            let card = waste.pop();
            card.show = false;
            deck.addTopCard(card);
          }
          for (let i = 0; i < latestMove.wasteSize; i++) {
            let card = deck.getBottomCard();
            card.show = true; //i == wasteSize - 1;
            waste.unshift(card);
          }
          this.setState({
            waste, deck
          });
          break;
      }
      return {};
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

function canSelect(target) {
  switch (target.pileType) {
    case PileTypes.WASTE:
      return target.pos == target.pileSize - 1;
  }
  return true;
}

function markSelected(target) {
  this.setState({
    src: target
  });
}

function resetSelection(state) {
  return {
    ...state,
    src: null
  }
}

function canMove(src, dest) {
  switch (dest.pileType) {
    case PileTypes.TABLEAUPILE:
      return dest.pos == dest.pileSize - 1 && src.card.getColor() != dest.card.getColor() && src.card.rank == dest.card.rank - 1;
    case PileTypes.EMPTYTABLEAU:
      return src.card.rank == PlayingCards.Rank.King;
    case PileTypes.FOUNDATION:
      if (src.pileType == PileTypes.TABLEAUPILE && src.pos != src.pileSize - 1)
        return false;
      return src.card.suit == dest.row && ((src.card.rank == PlayingCards.Rank.Ace) || (dest.card && src.card.rank == dest.card.rank + 1));
    default:
      return false;
  }
}

function processMove(src, dest) {
  let transplantCards = [];
  var move = {
    moveType: MoveTypes.MOVECARD,
    src,
    dest
  };
  switch (src.pileType) {
    case PileTypes.TABLEAUPILE:
      var tableauPile = this.state.data.tableauPiles[src.row];
      transplantCards = tableauPile.splice(src.pos, tableauPile.length - src.pos);
      move.reveal = revealTopCard(tableauPile);
      break;
    case PileTypes.WASTE:
      var card = this.state.data.waste.pop();
      move.reveal = revealTopCard(this.state.data.waste);
      transplantCards = [card];
      break;
    case PileTypes.FOUNDATION:
      transplantCards = [this.state.data.foundationPiles[this.state.data.src.row].pop()];
      break;
  }
  if (transplantCards.length == 0) {
    throw "Cards required for move";
  }
  let foundationPiles = this.state.data.foundationPiles;
  let tableauPiles = this.state.data.tableauPiles;
  switch (dest.pileType) {
    case PileTypes.TABLEAUPILE:
    case PileTypes.EMPTYTABLEAU:
      tableauPiles[dest.row] = tableauPiles[dest.row].concat(transplantCards);
      break;
    case PileTypes.FOUNDATION:
      foundationPiles[dest.row] = foundationPiles[dest.row].concat(transplantCards);
      break;
  }
  resetSelection();
  // this.setState({foundationPiles});
  logMove(move);
}

function logMove(move) {
  let moves = this.state.data.moves;
  moves.push(move);
  this.setState({
    moves, moveCount: this.state.data.moveCount + 1
  });
}

function revealTopCard(pile) {
  if (pile.length == 0)
    return false;
  let topCard = pile[pile.length - 1];
  if (!topCard.show) {
    return topCard.show = true;
  }
  return false;
}

//  todo keyboard commands
// handleKeyDown(e) {
//     var ESCAPE = 27;
//     if (e.keyCode == ESCAPE) {
//         resetSelection();
//     }
// }
//
