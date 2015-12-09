"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require("react");
var PileTypes = require('../../constants/PileTypes');
var MoveTypes = require('../../constants/MoveTypes');
var KlondikeCard = require('../KlondikeCard/KlondikeCard');
var react_redux_1 = require('react-redux');
var redux_1 = require('redux');
var widgetActions = require('redux/modules/widgets');
var Klondike;
(function (Klondike_1) {
    ;
    let Klondike = class extends React.Component {
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
            let target = { pileType: PileTypes.FOUNDATION, row: src.card.suit, card: card };
            if (KlondikeCard.canMove(src, target)) {
                this.move(src, target);
            }
        }
        move(src, dest) {
            let transplantCards = [];
            var move = { moveType: MoveTypes.MOVECARD, src: src, dest: dest };
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
            this.logMove(move);
        }
        logMove(move) {
            let moves = this.state.moves;
            moves.push(move);
            this.setState({ moves: moves, moveCount: this.state.moveCount + 1 });
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
                card.show = true;
                waste.push(card);
            }
            this.setState({ waste: waste, deck: deck });
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
                        card.show = true;
                        waste.unshift(card);
                    }
                    this.setState({ waste: waste, deck: deck });
                    break;
            }
            this.setState({ moves: moves, moveCount: this.state.moveCount + 1 });
        }
        handleKeyDown(e) {
            var ESCAPE = 27;
            if (e.keyCode == ESCAPE) {
                this.resetSelection();
            }
        }
        render() {
            var i = 0;
            return (React.createElement("div", {className: "KLO"}));
        }
    };
    Klondike = __decorate([
        react_redux_1.connect(state => ({
            src: state.klondike.src,
            moves: state.klondike.moves,
            moveCount: state.klondike.moveCount,
            initialDeckSize: state.klondike.initialDeckSize,
            deck: state.klondike.deck,
            waste: state.klondike.waste,
            foundationPiles: state.klondike.foundationPiles,
            tableauPiles: state.klondike.tableauPiles,
        }), dispatch => redux_1.bindActionCreators(widgetActions, dispatch)), 
        __metadata('design:paramtypes', [Object])
    ], Klondike);
    exports.default = Klondike;
})(Klondike || (Klondike = {}));
