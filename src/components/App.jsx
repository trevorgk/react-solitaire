/// <reference path="../../typings/react/react-addons.d.ts" />
import React from 'react';
import Solitaire from './Solitaire';

const rootEl = document.getElementById('solitaire');
console.log(rootEl)
React.render(
    <Solitaire pileCount={7} />, rootEl
);
