/// <reference path="../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Solitaire from './components/Solitaire';

const rootEl = document.getElementById('solitaire');
React.render(
    <Solitaire pileCount={7} />, rootEl
);
