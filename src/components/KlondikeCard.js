var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react');
var PlayingCards = require('../playing-cards');
var Common = require('../Common');
var KlondikeCard = (function (_super) {
    __extends(KlondikeCard, _super);
    function KlondikeCard(props) {
        _super.call(this, props);
        this.clickTimeoutId = null;
        this.handleClick = this.handleClick.bind(this);
    }
    KlondikeCard.canSelect = function (target) {
        switch (target.pileType) {
            case Common.PileTypes.WASTE:
                return target.pos == target.pileSize - 1;
        }
        return true;
    };
    KlondikeCard.canMove = function (src, dest) {
        switch (dest.pileType) {
            case Common.PileTypes.TABLEAUPILE:
                return dest.pos == dest.pileSize - 1 && src.card.getColor() != dest.card.getColor() && src.card.rank == dest.card.rank - 1;
            case Common.PileTypes.EMPTYTABLEAU:
                return src.card.rank == PlayingCards.Rank.King;
            case Common.PileTypes.FOUNDATION:
                if (src.pileType == Common.PileTypes.TABLEAUPILE && src.pos != src.pileSize - 1)
                    return false;
                return src.card.suit == dest.row && ((src.card.rank == PlayingCards.Rank.Ace) || (dest.card && src.card.rank == dest.card.rank + 1));
            default:
                return false;
        }
        return false;
    };
    KlondikeCard.renderOverlay = function (color) {
        return (<div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: color
        }}></div>);
    };
    KlondikeCard.prototype.handleClick = function () {
        var _this = this;
        var delay = 225;
        var payload = { pileType: this.props.pileType, row: this.props.row, card: this.props.card, pos: this.props.pos, pileSize: this.props.pileSize };
        if (!this.clickTimeoutId) {
            this.clickTimeoutId = setTimeout(function () {
                _this.props.clickHandler(payload);
                _this.clickTimeoutId = null;
            }, delay);
        }
        else {
            this.clickTimeoutId = clearTimeout(this.clickTimeoutId);
            this.props.doubleClickHandler(payload);
        }
    };
    KlondikeCard.prototype.render = function () {
        var style = React.addons.update({ position: "relative", width: "80px", height: "112px" }, { $merge: this.props.style });
        var selected = this.props.selected != null && this.props.selected.card.toString() == this.props.card.toString();
        var validDropTarget = !selected && this.props.card.show && this.props.selected != null && KlondikeCard.canMove(this.props.selected, { pileType: this.props.pileType, card: this.props.card, row: this.props.row, pos: this.props.pos, pileSize: this.props.pileSize });
        return (<div className="KlondikeCard" onClick={this.props.card.show && this.handleClick.bind(this)} style={style}>
              <img style={{ width: "100%" }} src={this.props.card.display()}/>
              {selected && KlondikeCard.renderOverlay('aquamarine')}
              
          </div>);
    };
    return KlondikeCard;
})(React.Component);
exports["default"] = KlondikeCard;
