var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react');
var PlayingCards = require('../playing-cards');
var KlondikeCard_1 = require('./KlondikeCard');
var Pile = (function (_super) {
    __extends(Pile, _super);
    function Pile(props) {
        _super.call(this, props);
    }
    Pile.prototype.render = function () {
        var _this = this;
        var pileStyle = this.props.pileStyle || {};
        var cardStyle = this.props.cardStyle || {};
        switch (this.props.layout) {
            case PlayingCards.Layout.Squared:
                pileStyle = React.addons.update({ position: "relative", width: "80px", height: "112px" }, { $merge: pileStyle });
                cardStyle = React.addons.update({ position: "absolute" }, { $merge: cardStyle });
                break;
            case PlayingCards.Layout.FannedRight:
                pileStyle = React.addons.update({
                    //clear:"both",
                    margin: "0 5px" }, { $merge: pileStyle });
                cardStyle = React.addons.update({ float: "left", marginLeft: "-65px" }, { $merge: cardStyle });
                break;
            case PlayingCards.Layout.FannedDown:
            default:
                pileStyle = React.addons.update({ float: "left", paddingTop: "95px" }, { $merge: pileStyle });
                cardStyle = React.addons.update({ marginTop: "-95px" }, { $merge: cardStyle });
                break;
        }
        // let cards = this.props.pile.map(function(card, z){
        //     return <KlondikeCard card={card} style={React.addons.update({zIndex:z}, {$merge: cardStyle})} />
        // });
        return (<div className="Pile" style={pileStyle}>
              {this.props.pile && this.props.pile.map(function (card, pos) {
            return <KlondikeCard_1["default"] card={card} selected={_this.props.selected} pileType={_this.props.pileType} pileSize={_this.props.pile.length} clickHandler={_this.props.clickHandler} doubleClickHandler={_this.props.doubleClickHandler} pos={pos} row={_this.props.row} style={React.addons.update({ zIndex: pos }, { $merge: cardStyle })}/>;
        })}
            </div>);
    };
    return Pile;
})(React.Component);
exports["default"] = Pile;
