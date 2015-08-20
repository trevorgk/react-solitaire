var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react/addons');
var Pile_1 = require('./Pile');
var PlayingCards = require('../playing-cards');
var Foundation = (function (_super) {
    __extends(Foundation, _super);
    function Foundation(props) {
        _super.call(this, props);
        this.handleClick = this.handleClick.bind(this);
    }
    Foundation.prototype.handleClick = function (event) {
        this.props.notifySelected(this.props.column);
    };
    ;
    Foundation.prototype.render = function () {
        var layout = PlayingCards.Layout.Squared;
        var style1 = {
            width: "80px",
            height: "112px",
            border: "1px solid #CCC",
            borderRadius: "5px",
            margin: "10px 5px"
        };
        var style2 = {
            float: "left"
        };
        var pile = React.createElement(Pile_1.default, {"layout": layout, "pile": this.props.pile});
        return (React.createElement("div", {"className": "Foundation", "onClick": this.handleClick.bind(this), "style": style2}, React.createElement("div", {"style": style1}, pile)));
    };
    return Foundation;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Foundation;
//# sourceMappingURL=Foundation.js.map