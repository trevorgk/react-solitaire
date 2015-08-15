import React from 'react';
import Solitaire from './Solitaire';

const rootEl = document.getElementById('solitaire');

React.render(
    <Solitaire pileCount={7} />, rootEl
);
