import React, {Component, PropTypes} from 'react';
import * as klondikeActions from 'redux/modules/klondike';
import * as PlayingCards from '../../models/playing-cards';
import * as PileTypes from '../../constants/PileTypes';
import {
  MoveTypes,
  Foundation,
  Pile,
  KlondikeCard,
  Tableau
} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(
  state => ({
    moveCount: state.klondike.moveCount,
    waste: state.klondike.waste,
    src: state.klondike.src,
    foundationPiles: state.klondike.foundationPiles,
    tableauPiles: state.klondike.tableauPiles
  }),
  dispatch => bindActionCreators(klondikeActions, dispatch)
)
export default class Klondike extends Component {

    constructor(props) {
        super(props);
        this.processClick = this.processClick.bind(this);
        this.processDoubleClick = this.processDoubleClick.bind(this);
        this.move = this.move.bind(this);
        this.logMove = this.logMove.bind(this);
    }
    resetSelection() {
        this.setState({ src: null });
    }
    revealTopCard(pile) {
        if (pile.length == 0)
            return false;
        let topCard = pile[pile.length - 1];
        if (!topCard.show) {
            return topCard.show = true;
        }
        return false;
    }
    processClick(target) {
        console.log('processClick', target);
        if (this.state.src == null && target.card != null) {
            if (KlondikeCard.canSelect(target)) {
                this.setState({ src: target });
            }
        }
        else if (this.state.src.card == target.card) {
            this.resetSelection();
        }
        else {
            if (KlondikeCard.canMove(this.state.src, target)) {
                this.move(this.state.src, target);
            }
            else
                this.setState({ src: target });
        }
    }
    processDoubleClick(src) {
        console.log('processDoubleClick', src);
        this.state.foundationPiles[src.row];
        var foundationPile = this.state.foundationPiles[src.card.suit];
        let card = foundationPile.length > 0 ? foundationPile[foundationPile.length - 1] : null;
        let target = { pileType: PileTypes.FOUNDATION, row: src.card.suit, card };
        if (KlondikeCard.canMove(src, target)) {
            this.move(src, target);
        }
    }
    move(src, dest) {
        let transplantCards = [];
        var move = { moveType: MoveTypes.MOVECARD, src, dest };
        switch (src.pileType) {
            case PileTypes.TABLEAUPILE:
                var tableauPile = this.state.tableauPiles[src.row];
                transplantCards = tableauPile.splice(src.pos, tableauPile.length - src.pos);
                move.reveal = this.revealTopCard(tableauPile);
                break;
            case PileTypes.WASTE:
                var card = this.state.waste.pop();
                move.reveal = this.revealTopCard(this.state.waste);
                transplantCards = [card];
                break;
            case PileTypes.FOUNDATION:
                transplantCards = [this.state.foundationPiles[this.state.src.row].pop()];
                break;
        }
        if (transplantCards.length == 0) {
            throw "Cards required for move";
        }
        let foundationPiles = this.state.foundationPiles;
        let tableauPiles = this.state.tableauPiles;
        switch (dest.pileType) {
            case PileTypes.TABLEAUPILE:
            case PileTypes.EMPTYTABLEAU:
                tableauPiles[dest.row] = tableauPiles[dest.row].concat(transplantCards);
                break;
            case PileTypes.FOUNDATION:
                foundationPiles[dest.row] = foundationPiles[dest.row].concat(transplantCards);
                break;
        }
        this.resetSelection();
        // this.setState({foundationPiles});
        this.logMove(move);
    }
    logMove(move) {
        let moves = this.state.moves;
        moves.push(move);
        this.setState({ moves, moveCount: this.state.moveCount + 1 });
    }
    stockClicked(event) {
        let deck = this.state.deck.concat(this.state.waste.reverse());
        let move = { moveType: MoveTypes.FLIPFROMSTOCK, wasteSize: this.state.waste.length };
        let wasteSize = this.props.wasteSize;
        if (this.state.deck.length() < wasteSize) {
            wasteSize = this.state.deck.length();
        }
        let waste = [];
        for (let i = 0; i < wasteSize; i++) {
            let card = deck.getTopCard();
            card.show = true; //i == wasteSize - 1;
            waste.push(card);
        }
        this.setState({ waste, deck });
        if (this.state.src && this.state.src.pileType == PileTypes.WASTE) {
            this.resetSelection();
        }
        this.logMove(move);
    }
    undoClicked() {
        let moves = this.state.moves;
        if (moves.length == 0) {
            alert('Nothing to undo...');
            return;
        }
        let move = moves.pop();
        console.log('undo clicked', move);
        let tableauPiles = this.state.tableauPiles;
        switch (move.moveType) {
            case MoveTypes.MOVECARD:
                let transplantCards = [];
                switch (move.dest.pileType) {
                    case PileTypes.EMPTYTABLEAU:
                        transplantCards = [this.state.tableauPiles[move.dest.row].pop()];
                        break;
                    case PileTypes.TABLEAUPILE:
                        let tableauPile = this.state.tableauPiles[move.dest.row];
                        transplantCards = tableauPile.splice(move.dest.pos + 1, tableauPile.length - move.dest.pos);
                        break;
                    case PileTypes.WASTE:
                        throw "Invalid undo source WASTE";
                    case PileTypes.FOUNDATION:
                        transplantCards = [this.state.foundationPiles[move.dest.row].pop()];
                        break;
                }
                if (transplantCards.length == 0) {
                    throw "Cards required for undo";
                }
                switch (move.src.pileType) {
                    case PileTypes.TABLEAUPILE:
                        let tableauPile = this.state.tableauPiles[move.src.row];
                        if (move.reveal) {
                            tableauPile[tableauPile.length - 1].show = false;
                        }
                        tableauPile = tableauPile.concat(transplantCards);
                        this.state.tableauPiles[move.src.row] = tableauPile;
                        break;
                    case PileTypes.FOUNDATION:
                        this.state.foundationPiles[move.src.row] = this.state.foundationPiles[move.src.row].concat(transplantCards);
                        break;
                    case PileTypes.WASTE:
                        this.state.waste = this.state.waste.concat(transplantCards);
                        break;
                }
                break;
            case MoveTypes.FLIPFROMSTOCK:
                let deck = this.state.deck;
                let waste = this.state.waste;
                while (waste.length > 0) {
                    let card = waste.pop();
                    card.show = false;
                    deck.addTopCard(card);
                }
                for (let i = 0; i < move.wasteSize; i++) {
                    let card = deck.getBottomCard();
                    card.show = true; //i == wasteSize - 1;
                    waste.unshift(card);
                }
                this.setState({ waste, deck });
                break;
        }
        this.setState({ moves, moveCount: this.state.moveCount + 1 });
    }
    handleKeyDown(e) {
        var ESCAPE = 27;
        if (e.keyCode == ESCAPE) {
            this.resetSelection();
        }
    }
    render() {
      const { moveCount, src, waste, tableauPiles, foundationPiles} = this.props;
        return (<div className="Solitaire">
            <div style={{
            width: "670px",
            margin: "0 auto",
            color: "white"
        }}>
              <div style={{
            textAlign: "center"
        }}>
                 {moveCount} {moveCount == 1 ? "move" : "moves"}
                 <div>
                   <input type="button" value="undo move" onClick={this.undoClicked.bind(this)}/>
                 </div>
              </div>
              <div className="">
                <div className="">
                    <div className="Stock" style={{
            width: "255px",
            margin: "10px 15px 0 20px",
            float: "left"
        }}>
                      <img src='cards/back-purple.png' onClick={this.stockClicked.bind(this)} style={{
            width: "80px",
            height: "112px",
            cursor: "pointer",
            float: "left"
        }}/>
                      <Pile layout={PlayingCards.Layout.FannedRight} pileType={PileTypes.WASTE} selected={src} doubleClickHandler={this.processDoubleClick} clickHandler={this.processClick} pile={waste} pileStyle={{
            float: "left",
            marginLeft: "75px" }}/>
                    </div>
                </div>
                <div>
                  {foundationPiles.map((pile, foundation) => <Foundation selected={src} clickHandler={this.processClick} pile={pile} row={foundation} suit={PlayingCards.Suit[foundation]}/>)}
                </div>
              </div>
              <div style={{ padding: "20px 10px 0", float: "right" }}>
                {tableauPiles.map((pile, tableau) => <Tableau selected={src} clickHandler={this.processClick} doubleClickHandler={this.processDoubleClick} pile={pile} row={tableau}/>)}
              </div>
            </div>
          </div>);
    }
}
