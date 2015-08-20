var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react/addons');
var Pile_1 = require('./Pile');
var PlayingCards = require('../playing-cards');
var Stock = (function (_super) {
    __extends(Stock, _super);
    function Stock(props) {
        _super.call(this, props);
        this.state = { waste: [] };
    }
    Stock.prototype.handleClick = function (event) {
        var wasteSize = 3;
        var cards = this.props.cards.concat(this.state.waste.reverse());
        var waste = [];
        for (var i = 0; i < wasteSize; i++) {
            var card = cards.getNextCard();
            card.show = i == wasteSize - 1;
            waste.push(card);
        }
        this.setState({ waste: waste });
        console.log('cards in deck', this.props.cards.toString());
    };
    ;
    Stock.prototype.render = function () {
        var pileStyle = {
            float: "left",
            marginLeft: "75px"
        };
        return (React.createElement("div", {"className": "Stock", "style": {
            width: "240px",
            margin: "10px 15px",
            float: "left"
        }}, React.createElement("img", {"src": 'img/cards/back-purple.png', "onClick": this.handleClick.bind(this), "style": {
            width: "80px",
            height: "112px",
            cursor: "pointer",
            float: "left"
        }}), React.createElement(Pile_1.default, {"layout": PlayingCards.Layout.FannedRight, "pile": this.state.waste, "pileStyle": {
            float: "left",
            marginLeft: "75px" }})));
    };
    return Stock;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stock;
//# sourceMappingURL=Stock.js.map