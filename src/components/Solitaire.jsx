import React, { PropTypes } from 'react';
import Pile from './Pile';
import Foundation from './Foundation';
import Stock from './Stock';
import PlayingCard from './PlayingCard';
import Tableau from './Tableau';

export default class Solitaire extends React.Component{

    constructor(props) {
      super(props);
      this.notifySelected = this.notifySelected.bind(this);

      let deck = new DeckOfCards(false);
      deck.shuffle();
      let piles = this.tableauPiles(this.props.pileCount, deck);
      this.state = {selectedCard: null, deck: deck, piles: piles};
    }

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

    notifySelected(card, row, column) {
      if (this.state.selectedCard == null) {
        this.setState({selectedCard: card, selectedRow: row, selectedColumn: column})
      }
      else if (card.toString() == this.state.selectedCard.toString()) {
        this.setState({selectedCard: null, selectedRow: null, selectedColumn: null});
      }
      else {
        console.log('move col ' + this.state.selectedColumn + ' to ' + column);
        console.log('move row ' + this.state.selectedRow + ' to ' + row);

        let srcPile = this.state.piles[this.state.selectedColumn];
        let destPile = this.state.piles[column];
        srcPile.splice(this.state.selectedRow, 1);
        destPile.push(this.state.selectedCard);

        if (srcPile.length > 0){
          srcPile[srcPile.length - 1].show = true;
        }

        this.setState({selectedCard: null, selectedRow: null, selectedColumn: null})
      }

      console.log('Selected card: ', card.toString());
      console.log('Selected row: ', row);
      console.log('Selected column: ', column);
    }

    render() {
        let style = {
          backgroundImage: "url(img/card-table-bg.png)",
          width:"650px",
          margin: "0 auto"
        };
        return (
          <div className="Solitaire" style={style}>
            <div className="">
              <div className="">
                <Stock cards={this.state.deck}/>
              </div>
              <div style={{paddingRight:"10px", float: "right"}}>
                <Foundation suit={Suit.Spades} />
                <Foundation suit={Suit.Clubs} />
                <Foundation suit={Suit.Diamonds} />
                <Foundation suit={Suit.Hearts} />
              </div>
            </div>
            <div>
              <Tableau selectedCard={this.state.selectedCard} notifySelected={this.notifySelected} piles={this.state.piles}/>
            </div>
            <br style={{clear: "both"}}/>
            <div className="diagnostics">
            </div>
          </div>
        );
      }
}
