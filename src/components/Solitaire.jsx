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

    notifySelected(card){
      this.setState({selectedCard: card});
      console.log('Selected: ',card.toString());
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
