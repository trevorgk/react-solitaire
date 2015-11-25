var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react');
var PlayingCards = require('../playing-cards');
var Pile_1 = require('./Pile');
var Foundation_1 = require('./Foundation');
var KlondikeCard_1 = require('./KlondikeCard');
var Tableau_1 = require('./Tableau');
var Diagnostics_1 = require('./Diagnostics');
var Common = require('../Common');
var Klondike = (function (_super) {
    __extends(Klondike, _super);
    function Klondike(props) {
        _super.call(this, props);
        this.processClick = this.processClick.bind(this);
        this.processDoubleClick = this.processDoubleClick.bind(this);
        this.move = this.move.bind(this);
        this.logMove = this.logMove.bind(this);
        var deck = new PlayingCards.DeckOfCards(false);
        deck.shuffle();
        var initialDeckSize = deck.length();
        var tableauPiles = (function (pileCount, deck) {
            var piles = [];
            for (var i = 0; i < pileCount; i++) {
                for (var j = pileCount - 1; j >= i; j--) {
                    if (!piles[j]) {
                        piles[j] = [];
                    }
                    var card = deck.getTopCard();
                    card.show = j == i;
                    piles[j].push(card);
                }
            }
            return piles;
        })(this.props.pileCount, deck);
        var foundationPiles = (function () {
            return [[], [], [], []];
        })();
        this.state = { deck: deck, tableauPiles: tableauPiles, foundationPiles: foundationPiles, moves: [], moveCount: 0, waste: [], initialDeckSize: initialDeckSize };
        console.log(this.state);
    }
    Klondike.prototype.resetSelection = function () {
        this.setState({ src: null });
    };
    Klondike.prototype.revealTopCard = function (pile) {
        if (pile.length == 0)
            return false;
        var topCard = pile[pile.length - 1];
        if (!topCard.show) {
            return topCard.show = true;
        }
        return false;
    };
    Klondike.prototype.processClick = function (target) {
        console.log('processClick', target);
        if (this.state.src == null && target.card != null) {
            if (KlondikeCard_1["default"].canSelect(target)) {
                this.setState({ src: target });
            }
        }
        else if (this.state.src.card == target.card) {
            this.resetSelection();
        }
        else {
            if (KlondikeCard_1["default"].canMove(this.state.src, target)) {
                this.move(this.state.src, target);
            }
            else
                this.setState({ src: target });
        }
    };
    Klondike.prototype.processDoubleClick = function (src) {
        console.log('processDoubleClick', src);
        this.state.foundationPiles[src.row];
        var foundationPile = this.state.foundationPiles[src.card.suit];
        var card = foundationPile.length > 0 ? foundationPile[foundationPile.length - 1] : null;
        var target = { pileType: Common.PileTypes.FOUNDATION, row: src.card.suit, card: card };
        if (KlondikeCard_1["default"].canMove(src, target)) {
            this.move(src, target);
        }
    };
    Klondike.prototype.move = function (src, dest) {
        var transplantCards = [];
        var move = { moveType: Common.MoveType.MOVECARD, src: src, dest: dest };
        switch (src.pileType) {
            case Common.PileTypes.TABLEAUPILE:
                var tableauPile = this.state.tableauPiles[src.row];
                transplantCards = tableauPile.splice(src.pos, tableauPile.length - src.pos);
                move.reveal = this.revealTopCard(tableauPile);
                break;
            case Common.PileTypes.WASTE:
                var card = this.state.waste.pop();
                move.reveal = this.revealTopCard(this.state.waste);
                transplantCards = [card];
                break;
            case Common.PileTypes.FOUNDATION:
                transplantCards = [this.state.foundationPiles[this.state.src.row].pop()];
                break;
        }
        if (transplantCards.length == 0) {
            throw "Cards required for move";
        }
        var foundationPiles = this.state.foundationPiles;
        var tableauPiles = this.state.tableauPiles;
        switch (dest.pileType) {
            case Common.PileTypes.TABLEAUPILE:
            case Common.PileTypes.EMPTYTABLEAU:
                tableauPiles[dest.row] = tableauPiles[dest.row].concat(transplantCards);
                break;
            case Common.PileTypes.FOUNDATION:
                foundationPiles[dest.row] = foundationPiles[dest.row].concat(transplantCards);
                break;
        }
        this.resetSelection();
        // this.setState({foundationPiles});
        this.logMove(move);
    };
    Klondike.prototype.logMove = function (move) {
        var moves = this.state.moves;
        moves.push(move);
        this.setState({ moves: moves, moveCount: this.state.moveCount + 1 });
    };
    Klondike.prototype.stockClicked = function (event) {
        var deck = this.state.deck.concat(this.state.waste.reverse());
        var move = { moveType: Common.MoveType.FLIPFROMSTOCK, wasteSize: this.state.waste.length };
        var wasteSize = this.props.wasteSize;
        if (this.state.deck.length() < wasteSize) {
            wasteSize = this.state.deck.length();
        }
        var waste = [];
        for (var i = 0; i < wasteSize; i++) {
            var card = deck.getTopCard();
            card.show = true; //i == wasteSize - 1;
            waste.push(card);
        }
        this.setState({ waste: waste, deck: deck });
        if (this.state.src && this.state.src.pileType == Common.PileTypes.WASTE) {
            this.resetSelection();
        }
        this.logMove(move);
    };
    Klondike.prototype.undoClicked = function () {
        var moves = this.state.moves;
        if (moves.length == 0) {
            alert('Nothing to undo...');
            return;
        }
        var move = moves.pop();
        console.log('undo clicked', move);
        var tableauPiles = this.state.tableauPiles;
        switch (move.moveType) {
            case Common.MoveType.MOVECARD:
                var transplantCards = [];
                switch (move.dest.pileType) {
                    case Common.PileTypes.EMPTYTABLEAU:
                        transplantCards = [this.state.tableauPiles[move.dest.row].pop()];
                        break;
                    case Common.PileTypes.TABLEAUPILE:
                        var tableauPile = this.state.tableauPiles[move.dest.row];
                        transplantCards = tableauPile.splice(move.dest.pos + 1, tableauPile.length - move.dest.pos);
                        break;
                    case Common.PileTypes.WASTE:
                        throw "Invalid undo source WASTE";
                    case Common.PileTypes.FOUNDATION:
                        transplantCards = [this.state.foundationPiles[move.dest.row].pop()];
                        break;
                }
                if (transplantCards.length == 0) {
                    throw "Cards required for undo";
                }
                switch (move.src.pileType) {
                    case Common.PileTypes.TABLEAUPILE:
                        var tableauPile = this.state.tableauPiles[move.src.row];
                        if (move.reveal) {
                            tableauPile[tableauPile.length - 1].show = false;
                        }
                        tableauPile = tableauPile.concat(transplantCards);
                        this.state.tableauPiles[move.src.row] = tableauPile;
                        break;
                    case Common.PileTypes.FOUNDATION:
                        this.state.foundationPiles[move.src.row] = this.state.foundationPiles[move.src.row].concat(transplantCards);
                        break;
                    case Common.PileTypes.WASTE:
                        this.state.waste = this.state.waste.concat(transplantCards);
                        break;
                }
                break;
            case Common.MoveType.FLIPFROMSTOCK:
                var deck = this.state.deck;
                var waste = this.state.waste;
                while (waste.length > 0) {
                    var card = waste.pop();
                    card.show = false;
                    deck.addTopCard(card);
                }
                for (var i = 0; i < move.wasteSize; i++) {
                    var card = deck.getBottomCard();
                    card.show = true; //i == wasteSize - 1;
                    waste.unshift(card);
                }
                this.setState({ waste: waste, deck: deck });
                break;
        }
        this.setState({ moves: moves, moveCount: this.state.moveCount + 1 });
    };
    Klondike.prototype.handleKeyDown = function (e) {
        var ESCAPE = 27;
        if (e.keyCode == ESCAPE) {
            this.resetSelection();
        }
    };
    Klondike.prototype.render = function () {
        var _this = this;
        var elapsed = Math.round(this.props.elapsed / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0');
        return (<div className="Solitaire">
            <Diagnostics_1["default"] initialDeckSize={this.state.initialDeckSize} deck={this.state.deck} foundations={this.state.foundationPiles} tableaus={this.state.tableauPiles} waste={this.state.waste} moves={this.state.moves}/>
            <div style={{
            width: "670px",
            margin: "0 auto",
            color: "white"
        }}>
              <div style={{
            textAlign: "center"
        }}>
                 {seconds} seconds | {this.state.moveCount} {this.state.moveCount == 1 ? "move" : "moves"}
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
                      <img src='img/cards/back-purple.png' onClick={this.stockClicked.bind(this)} style={{
            width: "80px",
            height: "112px",
            cursor: "pointer",
            float: "left"
        }}/>
                      <Pile_1["default"] layout={PlayingCards.Layout.FannedRight} pileType={Common.PileTypes.WASTE} selected={this.state.src} doubleClickHandler={this.processDoubleClick} clickHandler={this.processClick} pile={this.state.waste} pileStyle={{
            float: "left",
            marginLeft: "75px" }}/>
                    </div>
                </div>
                <div>
                  {this.state.foundationPiles.map(function (pile, foundation) {
            return <Foundation_1["default"] selected={_this.state.src} clickHandler={_this.processClick} pile={pile} row={foundation} suit={PlayingCards.Suit[foundation]}/>;
        })}
                </div>
              </div>
              <div style={{ padding: "20px 10px 0", float: "right" }}>
                {this.state.tableauPiles.map(function (pile, tableau) {
            return <Tableau_1["default"] selected={_this.state.src} clickHandler={_this.processClick} doubleClickHandler={_this.processDoubleClick} pile={pile} row={tableau}/>;
        })}
              </div>
            </div>
          </div>);
    };
    return Klondike;
})(React.Component);
exports["default"] = Klondike;
