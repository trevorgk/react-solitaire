/// <reference path="../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Klondike from './components/Klondike';

const rootEl = document.getElementById('solitaire');
var start = new Date().getTime();
React.render(
    <Klondike pileCount={7} wasteSize={3} elapsed={new Date().getTime() - start} />, rootEl
);
