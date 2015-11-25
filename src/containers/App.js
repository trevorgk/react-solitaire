/// <reference path="../typings/react/react-addons.d.ts" />
var react_redux_1 = require('react-redux');
var React = require('react');
var Klondike_1 = require('./components/Klondike');
var rootEl = document.getElementById('solitaire');
var start = new Date().getTime();
React.render(<Klondike_1["default"] pileCount={7} wasteSize={3} elapsed={new Date().getTime() - start}/>, rootEl);
var mapStateToProps = function (state) { return ({
    todos: state.todos
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(App);
