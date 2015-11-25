var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react');
var PlayingCards = require('../playing-cards');
var Pile_1 = require('./Pile');
var Common = require('../Common');
var KlondikeCard_1 = require('./KlondikeCard');
var Tableau = (function (_super) {
    __extends(Tableau, _super);
    function Tableau(props) {
        _super.call(this, props);
    }
    Tableau.prototype.emptyPileClickHandler = function (event) {
        if (this.props.clickHandler) {
            this.props.clickHandler({ pileType: Common.PileTypes.EMPTYTABLEAU, row: this.props.row });
        }
    };
    ;
    Tableau.prototype.render = function () {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selected} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });
        var validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard_1["default"].canMove(this.props.selected, { pileType: Common.PileTypes.EMPTYTABLEAU, row: this.props.row });
        return (<div className="Tableau" onClick={this.props.pile.length == 0 && this.emptyPileClickHandler.bind(this)} style={{
            position: "relative",
            width: "80px",
            height: "112px",
            border: "1px solid #CCC",
            borderRadius: "5px",
            margin: "10px 5px",
            backgroundPosition: "18px 30px",
            float: "left"
        }}>
              <Pile_1["default"] layout={PlayingCards.Layout.FannedDown} pileType={Common.PileTypes.TABLEAUPILE} selected={this.props.selected} row={this.props.row} pile={this.props.pile} clickHandler={this.props.clickHandler} doubleClickHandler={this.props.doubleClickHandler}/>
              
            </div>);
    };
    return Tableau;
})(React.Component);
exports["default"] = Tableau;
