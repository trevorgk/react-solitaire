import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as klondikeActions from 'redux/modules/widgets';
import DocumentMeta from 'react-document-meta';
import {Klondike} from 'components';
import connectData from 'helpers/connectData';
import config from '../../config';

export default class PlayKlondike extends Component {

  // state = {
  //   klondike: (function() {
  //     let deck = new PlayingCards.DeckOfCards(false);
  //     deck.shuffle();
  //
  //     let initialDeckSize = deck.length();
  //
  //     let tableauPiles = (function(pileCount: number, deck: PlayingCards.DeckOfCards) {
  //       let piles = [];
  //       for (let i = 0; i < pileCount; i++) {
  //           for (let j = pileCount - 1; j >= i; j--) {
  //               if (!piles[j]) {
  //                   piles[j] = [];
  //               }
  //               let card = deck.getTopCard();
  //               card.show = j == i;
  //
  //               piles[j].push(card);
  //           }
  //       }
  //       return piles;
  //     })(this.props.pileCount, deck);
  //
  //     let foundationPiles = (function() {
  //       return [[],[],[],[]];
  //     })();
  //
  //     return {deck, tableauPiles, foundationPiles, moves: [], moveCount:0, waste: [], initialDeckSize};
  //   })()
  // };

  render() {
    debugger;

    return (
      <div className="container">
        <Klondike foo="aah"/>
      </div>
    );
  }
}
