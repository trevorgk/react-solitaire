import React from 'react';
const rootEl = document.getElementById('solitaire');

import Solitaire from './Solitaire';
React.render(
    <Solitaire pileCount={7} />, rootEl
);
