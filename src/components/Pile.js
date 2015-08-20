var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react/addons');
var PlayingCard_1 = require('./PlayingCard');
var PlayingCards = require('../playing-cards');
var Pile = (function (_super) {
    __extends(Pile, _super);
    function Pile(props) {
        _super.call(this, props);
        this.notifySelected = this.notifySelected.bind(this);
    }
    Pile.prototype.notifySelected = function (card, row) {
        if (this.props.notifySelected)
            this.props.notifySelected(card, row, this.props.column);
    };
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
                pileStyle = React.addons.update({ float: "left", margin: "0 5px" }, { $merge: pileStyle });
                cardStyle = React.addons.update({ marginTop: "-95px" }, { $merge: cardStyle });
                break;
        }
        // let cards = this.props.pile.map(function(card, z){
        //     return <PlayingCard card={card} style={React.addons.update({zIndex:z}, {$merge: cardStyle})} />
        // });
        return (React.createElement("div", {"className": "Pile", "style": pileStyle}, this.props.pile.map(function (card, row) {
            return React.createElement(PlayingCard_1.default, {"card": card, "selectedCard": _this.props.selectedCard, "notifySelected": _this.notifySelected, "row": row, "style": React.addons.update({ zIndex: row }, { $merge: cardStyle })});
        })));
    };
    return Pile;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pile;
//# sourceMappingURL=Pile.js.map