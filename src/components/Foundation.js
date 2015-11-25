var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react');
var PlayingCards = require('../playing-cards');
var Pile_1 = require('./Pile');
var KlondikeCard_1 = require('./KlondikeCard');
var Common = require('../Common');
var Foundation = (function (_super) {
    __extends(Foundation, _super);
    function Foundation(props) {
        _super.call(this, props);
    }
    Foundation.prototype.emptyFoundationClicked = function () {
        if (this.props.clickHandler) {
            var card = this.props.pile.length > 0 ? this.props.pile[this.props.pile.length - 1] : null;
            this.props.clickHandler({ pileType: Common.PileTypes.FOUNDATION, row: this.props.row, card: card });
        }
    };
    Foundation.prototype.render = function () {
        var layout = PlayingCards.Layout.Squared;
        var card = this.props.pile.length > 0 ? this.props.pile[this.props.pile.length - 1] : null;
        var validDropTarget = this.props.selected != null && KlondikeCard_1["default"].canMove(this.props.selected, { pileType: Common.PileTypes.FOUNDATION, row: this.props.row, card: card });
        return (<div className="Foundation" onClick={this.props.pile.length == 0 && this.emptyFoundationClicked.bind(this)} style={{
            float: "left"
        }}>
        <div style={{
            position: "relative",
            width: "80px",
            height: "112px",
            border: "1px solid #CCC",
            borderRadius: "5px",
            margin: "10px 5px",
            backgroundImage: "url(" + PlayingCards.Card.getPip(this.props.suit) + ")",
            backgroundPosition: "18px 30px"
        }}>
          <Pile_1["default"] layout={layout} pileType={Common.PileTypes.FOUNDATION} selected={this.props.selected} pile={this.props.pile} row={this.props.row} clickHandler={this.props.clickHandler}/>
          
        </div>
      </div>);
    };
    return Foundation;
})(React.Component);
exports["default"] = Foundation;
