var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react/addons');
var Pile_1 = require('./Pile');
var PlayingCards = require('../playing-cards');
var Tableau = (function (_super) {
    __extends(Tableau, _super);
    function Tableau(props) {
        _super.call(this, props);
    }
    Tableau.prototype.render = function () {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selectedCard} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });
        var _this = this;
        return (React.createElement("div", {"className": "Tableau", "style": { padding: "130px 10px 120px", float: "right" }}, this.props.piles.map(function (pile, column) {
            return React.createElement(Pile_1.default, {"layout": PlayingCards.Layout.FannedDown, "selectedCard": _this.props.selectedCard, "column": column, "notifySelected": _this.props.notifySelected, "pile": pile});
        })));
    };
    return Tableau;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tableau;
//# sourceMappingURL=Tableau.js.map