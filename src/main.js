/// <reference path='../typings/react/react.d.ts'/>
/// <reference path='../typings/redux-actions/redux-actions.d.ts'/>
/// <reference path='../typings/redux/redux.d.ts'/>
/// <reference path='../typings/react-redux/react-redux.d.ts'/>
var React = require('react');
var redux_1 = require('redux');
var rootReducer_ts_1 = require('./reducers/rootReducer.ts');
var initialState = {};
var store = redux_1.createStore(rootReducer_ts_1.rootReducer, initialState);
React.render(store, { store: store } >
    {}(), />}
    < /Provider>,, document.getElementById('app'));
