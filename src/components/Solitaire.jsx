import React, { PropTypes } from 'react';
import Pile from './Pile';
import Foundation from './Foundation';
import Stock from './Stock';
import PlayingCard from './PlayingCard';
import Tableau from './Tableau';

export default class Solitaire extends React.Component{

    tableauPiles(pileCount, deck){
        let piles = [];
        for (let i = 0; i < pileCount; i++) {
            for (let j = pileCount - 1; j >= i; j--) {
                if (!piles[j]) {
                    piles[j] = [];
                }
                let card = deck.getNextCard();
                card.show = j == i;

                piles[j].push(card);
            }
        }
        return piles;
    }

    render() {
        const pileCount = this.props.pileCount;
        let deck = new DeckOfCards(false);

        deck.shuffle();
        let piles = this.tableauPiles(pileCount, deck);
        let style = {
          backgroundImage: "url(img/card-table-bg.png)",
          width:"650px",
          margin: "0 auto"
        };
        return (
          <div className="Solitaire" style={style}>
            <div className="">
              <div className="">
                <Stock cards={deck}/>
              </div>
              <div style={{paddingRight:"10px", float: "right"}}>
                <Foundation suit={Suit.Spades} />
                <Foundation suit={Suit.Clubs} />
                <Foundation suit={Suit.Diamonds} />
                <Foundation suit={Suit.Hearts} />
              </div>
            </div>
            <div>
              <Tableau piles={piles}/>
            </div>
            <br style={{clear: "both"}}/>
            <div className="diagnostics">
              <p>Cards in stock:{deck.length()}</p>
            </div>
          </div>
        );
      }
}
