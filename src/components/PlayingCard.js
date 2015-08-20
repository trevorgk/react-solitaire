var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react/addons');
var PlayingCard = (function (_super) {
    __extends(PlayingCard, _super);
    function PlayingCard(props) {
        _super.call(this, props);
        this.state = { isSelected: false };
    }
    PlayingCard.prototype.renderOverlay = function (color) {
        return (React.createElement("div", {"style": {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: color,
        }}));
    };
    PlayingCard.prototype.handleClick = function (event) {
        this.props.notifySelected(this.props.card, this.props.row);
    };
    ;
    PlayingCard.prototype.render = function () {
        var style = React.addons.update({ position: "relative", width: "80px", height: "112px" }, { $merge: this.props.style });
        var selected = this.props.selectedCard != null && this.props.card.toString() == this.props.selectedCard.toString();
        return (React.createElement("div", {"className": "PlayingCard", "onClick": this.props.card.show && this.handleClick.bind(this), "style": style}, React.createElement("img", {"style": { width: "100%" }, "src": this.props.card.display()}), selected && this.renderOverlay('aquamarine')));
    };
    return PlayingCard;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlayingCard;
//# sourceMappingURL=PlayingCard.js.map