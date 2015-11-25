/// <reference path="../typings/react/react-addons.d.ts" />

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import Klondike from './components/Klondike';

const rootEl = document.getElementById('solitaire');
var start = new Date().getTime();
React.render(
    <Klondike pileCount={7} wasteSize={3} elapsed={new Date().getTime() - start} />, rootEl
);

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
