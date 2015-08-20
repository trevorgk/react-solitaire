/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import Foundation from './Foundation';
import Stock from './Stock';
import PlayingCard from './PlayingCard';
import Tableau from './Tableau';
import * as PlayingCards from '../playing-cards';
//
// declare module JSX {
//     interface IntrinsicElements {
//         Pile: any
//     }
// }

interface Props extends React.Props<any> {
  pileCount: number,
}

export default class Solitaire extends React.Component<Props,any>{

    constructor(props) {
      super(props);
      this.notifySelected = this.notifySelected.bind(this);
      this.notifyFoundationSelected = this.notifyFoundationSelected.bind(this);

      let deck = new PlayingCards.DeckOfCards(false);
      deck.shuffle();
      let piles = this.tableauPiles(this.props.pileCount, deck);
      let foundationPiles = this.foundationPiles();
      this.state = {selectedCard: null, deck: deck, piles: piles, foundationPiles:foundationPiles, moves:0};
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

    foundationPiles(){
      return [[],[],[],[]];
    }

    notifyFoundationSelected(column){
      var pile = this.state.foundationPiles[column];
      if (this.state.selectedCard == null) {
        console.log('notifyFoundationSelected: do nothing', column);
      } else {
          pile.push(this.state.selectedCard);
          this.removeTableauCard();

          this.setState({selectedCard: null, selectedRow: null, selectedColumn: null})
      }
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

        let destPile = this.state.piles[column];
        destPile.push(this.state.selectedCard);
        this.removeTableauCard();

        this.setState({selectedCard: null, selectedRow: null, selectedColumn: null})
      }

      this.setState({moves:this.state.moves+1})

      console.log('Selected card: ', card.toString());
      console.log('Selected row: ', row);
      console.log('Selected column: ', column);
    }

    removeTableauCard(){
      let srcPile = this.state.piles[this.state.selectedColumn];
      srcPile.splice(this.state.selectedRow, 1);
      if (srcPile.length > 0){
        srcPile[srcPile.length - 1].show = true;
      }
    }
    // movePiles(fromPile, column, row, toPile)

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
              <div style={{paddingRight:"10px", float: "left"}}>
                {this.state.foundationPiles.map((pile, foundation)  =>
                    <Foundation notifySelected={this.notifyFoundationSelected} pile={pile} column={foundation}/>
                  )}
              </div>
            </div>
            <div>
              <Tableau selectedCard={this.state.selectedCard} notifySelected={this.notifySelected} piles={this.state.piles}/>
            </div>
            <br style={{clear: "both"}}/>
            <div className="diagnostics">
              mc: {this.state.moves}
            </div>
          </div>
        );
      }
}
