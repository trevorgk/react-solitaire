var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react/addons');
var Foundation_1 = require('./Foundation');
var Stock_1 = require('./Stock');
var Tableau_1 = require('./Tableau');
var PlayingCards = require('../playing-cards');
var Solitaire = (function (_super) {
    __extends(Solitaire, _super);
    function Solitaire(props) {
        _super.call(this, props);
        this.notifySelected = this.notifySelected.bind(this);
        this.notifyFoundationSelected = this.notifyFoundationSelected.bind(this);
        var deck = new PlayingCards.DeckOfCards(false);
        deck.shuffle();
        var piles = this.tableauPiles(this.props.pileCount, deck);
        var foundationPiles = this.foundationPiles();
        this.state = { selectedCard: null, deck: deck, piles: piles, foundationPiles: foundationPiles, moves: 0 };
    }
    Solitaire.prototype.tableauPiles = function (pileCount, deck) {
        var piles = [];
        for (var i = 0; i < pileCount; i++) {
            for (var j = pileCount - 1; j >= i; j--) {
                if (!piles[j]) {
                    piles[j] = [];
                }
                var card = deck.getNextCard();
                card.show = j == i;
                piles[j].push(card);
            }
        }
        return piles;
    };
    Solitaire.prototype.foundationPiles = function () {
        return [[], [], [], []];
    };
    Solitaire.prototype.notifyFoundationSelected = function (column) {
        var pile = this.state.foundationPiles[column];
        if (this.state.selectedCard == null) {
            console.log('notifyFoundationSelected: do nothing', column);
        }
        else {
            pile.push(this.state.selectedCard);
            this.removeTableauCard();
            this.setState({ selectedCard: null, selectedRow: null, selectedColumn: null });
        }
    };
    Solitaire.prototype.notifySelected = function (card, row, column) {
        if (this.state.selectedCard == null) {
            this.setState({ selectedCard: card, selectedRow: row, selectedColumn: column });
        }
        else if (card.toString() == this.state.selectedCard.toString()) {
            this.setState({ selectedCard: null, selectedRow: null, selectedColumn: null });
        }
        else {
            console.log('move col ' + this.state.selectedColumn + ' to ' + column);
            console.log('move row ' + this.state.selectedRow + ' to ' + row);
            var destPile = this.state.piles[column];
            destPile.push(this.state.selectedCard);
            this.removeTableauCard();
            this.setState({ selectedCard: null, selectedRow: null, selectedColumn: null });
        }
        this.setState({ moves: this.state.moves + 1 });
        console.log('Selected card: ', card.toString());
        console.log('Selected row: ', row);
        console.log('Selected column: ', column);
    };
    Solitaire.prototype.removeTableauCard = function () {
        var srcPile = this.state.piles[this.state.selectedColumn];
        srcPile.splice(this.state.selectedRow, 1);
        if (srcPile.length > 0) {
            srcPile[srcPile.length - 1].show = true;
        }
    };
    // movePiles(fromPile, column, row, toPile)
    Solitaire.prototype.render = function () {
        var _this = this;
        var style = {
            backgroundImage: "url(img/card-table-bg.png)",
            width: "650px",
            margin: "0 auto"
        };
        return (React.createElement("div", {"className": "Solitaire", "style": style}, React.createElement("div", {"className": ""}, React.createElement("div", {"className": ""}, React.createElement(Stock_1.default, {"cards": this.state.deck})), React.createElement("div", {"style": { paddingRight: "10px", float: "left" }}, this.state.foundationPiles.map(function (pile, foundation) {
            return React.createElement(Foundation_1.default, {"notifySelected": _this.notifyFoundationSelected, "pile": pile, "column": foundation});
        }))), React.createElement("div", null, React.createElement(Tableau_1.default, {"selectedCard": this.state.selectedCard, "notifySelected": this.notifySelected, "piles": this.state.piles})), React.createElement("br", {"style": { clear: "both" }}), React.createElement("div", {"className": "diagnostics"}, "mc: ", this.state.moves)));
    };
    return Solitaire;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Solitaire;
//# sourceMappingURL=Solitaire.js.map