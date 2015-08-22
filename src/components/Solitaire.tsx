/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import Foundation from './Foundation';
import Stock from './Stock';
import PlayingCard from './PlayingCard';
import Tableau from './Tableau';
import * as Constants from '../Constants';
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
      this.foundationSelected = this.foundationSelected.bind(this);
      this.tableauSelected = this.tableauSelected.bind(this);
      this.wasteSelected = this.wasteSelected.bind(this);

      let deck = new PlayingCards.DeckOfCards(false);
      deck.shuffle();
      let piles = this.tableauPiles(this.props.pileCount, deck);
      let foundationPiles = this.foundationPiles();
      this.state = {selectedCard: null, deck: deck, piles: piles, foundationPiles:foundationPiles, moves:0, waste: []};
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

    resetSelection(){
      this.setState({selectedCard: null, selectedSrc:null, selectedRow: null, selectedColumn: null});
      console.log('resetting selection');
    }

    wasteSelected(card){
      if (this.state.selectedCard == null) {
        this.setState({selectedCard: card, selectedSrc:Constants.PileType.STOCK, selectedColumn: 0})
      }
      else if (card.toString() == this.state.selectedCard.toString()) {
          this.resetSelection();
      }
      else {

      }
    }

    foundationSelected(card, column){
      if (this.state.selectedCard == null) {
        this.setState({selectedCard: card, selectedSrc:Constants.PileType.FOUNDATION, selectedColumn: column})
      }
      else if (card.toString() == this.state.selectedCard.toString()) {
        this.resetSelection();
      }
      else {
        var pile = this.state.foundationPiles[column];
        pile.push(this.state.selectedCard);
        //this.removeTableauCard();

        this.resetSelection();
      }
    }

    tableauSelected(card, row, column) {
      if (this.state.selectedCard == null) {
        this.setState({selectedCard: card, selectedSrc:Constants.PileType.TABLEAU, selectedRow: row, selectedColumn: column})
      }
      else if (card.toString() == this.state.selectedCard.toString()) {
        this.resetSelection();
      }
      else {
        console.log('move col ' + this.state.selectedColumn + ' to ' + column);
        console.log('move row ' + this.state.selectedRow + ' to ' + row);

        if (!this.canMoveCard(this.state.selectedSrc, this.state.selectedCard, Constants.PileType.TABLEAU, card)) {
          return;
        }
        let transplantCards = [];
        switch(this.state.selectedSrc){
          case Constants.PileType.TABLEAU:
            transplantCards = this.removeTableauCard(this.state.selectedColumn, this.state.selectedRow);
            break;
          case Constants.PileType.STOCK:
            transplantCards = this.removeStockCard();
            break;
        }

        this.addTableauCard(transplantCards, column)
        this.resetSelection();
      }

      this.setState({moves:this.state.moves + 1})
    }

    addTableauCard(cards: PlayingCards.Card[], column){
      let piles = this.state.piles;
      let destPile = piles[column];
      piles[column] = destPile.concat(cards);
    }

    removeTableauCard(column, row) : PlayingCards.Card[]{
      let srcPile = this.state.piles[column];
      var cards = srcPile.splice(row, srcPile.length - row);

      this.revealTopCard(srcPile);
      return cards;
    }

    revealTopCard(pile:PlayingCards.Card[]){
      if (pile.length > 0){
        pile[pile.length - 1].show = true;
      }
    }

    removeStockCard() : PlayingCards.Card[]{
      var card = this.state.waste.pop();
      this.revealTopCard(this.state.waste);
      return [card];
    }
    // movePiles(fromPile, column, row, toPile)

    canMoveCard(src:string, srcCard:PlayingCards.Card, dest:string, destCard:PlayingCards.Card) : boolean{
      switch(dest){
        case Constants.PileType.TABLEAU:
          return (destCard.getColor() != srcCard.getColor()) && destCard.rank == srcCard.rank + 1;
        case Constants.PileType.FOUNDATION:
          return true;
        default:
          return false;
      }
      if (dest == Constants.PileType.TABLEAU){
      }
      return false;
    }

    stockClicked(event) {
        const wasteSize = 3;
        let deck = this.state.deck.concat(this.state.waste.reverse());
        let waste = [];
        for (let i = 0; i < wasteSize; i++){
            let card = deck.getNextCard();
            card.show = i == wasteSize - 1;
            waste.push(card);
        }
        this.setState({waste, deck});
        if (this.state.selectedSrc == Constants.PileType.STOCK){
          this.resetSelection();
        }
        console.log('cards in deck', this.state.deck.toString());
    };

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
                  <div className="Stock" style={{
                      width: "240px",
                      margin: "10px 15px",
                      float: "left"
                  }}>
                    <img src='img/cards/back-purple.png' onClick={this.stockClicked.bind(this)} style={{
                     width: "80px",
                     height: "112px",
                     cursor: "pointer",
                     float:"left"
                    }}/>
                    <Pile layout={PlayingCards.Layout.FannedRight} selectedCard={this.state.selectedCard} notifySelected={this.wasteSelected} pile={this.state.waste} pileStyle={{
                          float:"left",
                          marginLeft:"75px"}} />
                  </div>
              </div>
              <div style={{paddingRight:"10px", float: "left"}}>
                {this.state.foundationPiles.map((pile, foundation)  =>
                    <Foundation notifySelected={this.foundationSelected} pile={pile} column={foundation} suit={PlayingCards.Suit[foundation]} />
                  )}
              </div>
            </div>
            <div>
              <Tableau selectedCard={this.state.selectedCard} notifySelected={this.tableauSelected} piles={this.state.piles}/>
            </div>
            <br style={{clear: "both"}}/>
            <div className="diagnostics">
              mc: {this.state.moves}
            </div>
          </div>
        );
      }
}
