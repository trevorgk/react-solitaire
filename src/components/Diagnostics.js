var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react-addons.d.ts" />
var React = require('react');
var Diagnostics = (function (_super) {
    __extends(Diagnostics, _super);
    function Diagnostics(props) {
        _super.call(this, props);
        console.log(props);
    }
    Diagnostics.prototype.render = function () {
        var _this = this;
        var deckLength = this.props.deck.length();
        var wasteLength = this.props.waste.length;
        var foundationLength = this.props.foundations.map(function (card) { return card.length; }).reduce(function (prev, curr) { return prev + curr; });
        var tableauLength = this.props.tableaus.map(function (card) { return card.length; }).reduce(function (prev, curr) { return prev + curr; });
        var total = deckLength + wasteLength + foundationLength + tableauLength;
        var initialDeckSize = this.props.initialDeckSize;
        return (<div className="Diagnostics" style={{ float: "right", backgroundColor: "white" }}>
            <div style={{ color: (total == initialDeckSize ? "green" : "red") }}>{total}</div>
            <div>stock: {deckLength}</div>
            <div>waste: {wasteLength}</div>
            <div>foundation: {foundationLength}</div>
            <div>tableau: {tableauLength}</div>
            <button onClick={function () { return console.log(_this.props.moves); }}>log history</button><br />
            <button onClick={function () { return console.log(_this.props.deck.toString()); }}>log stock</button>
          </div>);
    };
    return Diagnostics;
})(React.Component);
exports["default"] = Diagnostics;
