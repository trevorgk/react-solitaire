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
      this.foundationClicked = this.foundationClicked.bind(this);
      this.tableauPileClicked = this.tableauPileClicked.bind(this);
      this.emptyTableauClicked = this.emptyTableauClicked.bind(this);
      this.wasteClicked = this.wasteClicked.bind(this);

      let deck = new PlayingCards.DeckOfCards(false);
      deck.shuffle();
      let tableauPiles = this.tableauPiles(this.props.pileCount, deck);
      let foundationPiles = this.foundationPiles();
      this.state = {selectedCard: null, deck: deck, tableauPiles: tableauPiles, foundationPiles: foundationPiles, moves:0, waste: []};
    }

    tableauPiles(pileCount: number, deck: PlayingCards.DeckOfCards){
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

    wasteClicked(card: PlayingCards.Card){
      if (this.state.selectedCard == null) {
        this.setState({selectedCard: card, selectedSrc:Constants.PileType.STOCK, selectedColumn: 0})
      }
      else if (card.toString() == this.state.selectedCard.toString()) {
          this.resetSelection();
      }
    }

    foundationClicked(foundation: number, pile: PlayingCards.Card[]){
      if (this.state.selectedCard == null) {
        if (pile.length > 0) {
          this.setState({selectedCard: pile[pile.length - 1], selectedSrc:Constants.PileType.FOUNDATION, selectedColumn: foundation})
        }
      }
      else if (pile.length > 0 && pile[pile.length - 1].toString() == this.state.selectedCard.toString()) {
          this.resetSelection();
      }
      else {
        if (this.state.selectedCard.suit != foundation) {
          return;
        }
        if (pile.length == 0 && this.state.selectedCard.rank != PlayingCards.Rank.Ace){
          return;
        }
        if (pile.length > 0 && !this.canMoveCard(this.state.selectedSrc, this.state.selectedCard, Constants.PileType.FOUNDATION, pile[pile.length-1])) {
          return;
        }
        var transplantCards = this.removeSelected();
        this.addFoundationCard(transplantCards[0], foundation)
        this.resetSelection();

        //this.removeTableauCard();

        this.resetSelection();
        this.setState({moves:this.state.moves + 1})
      }
    }

    addFoundationCard(card: PlayingCards.Card, foundation: number){
      var foundationPiles = this.state.foundationPiles;
      var pile = foundationPiles[foundation];
      pile.push(card);
      this.setState({foundationPiles})
    }

    tableauPileClicked(card:PlayingCards.Card, row: number, column: number) {
      if (this.state.selectedCard == null) {
        this.setState({selectedCard: card, selectedSrc:Constants.PileType.TABLEAUPILE, selectedRow: row, selectedColumn: column})
      }
      else if (card.toString() == this.state.selectedCard.toString()) {
        this.resetSelection();
      }
      else {
        console.log('move col ' + this.state.selectedColumn + ' to ' + column);
        console.log('move row ' + this.state.selectedRow + ' to ' + row);

        if (!this.canMoveCard(this.state.selectedSrc, this.state.selectedCard, Constants.PileType.TABLEAUPILE, card)) {
          return;
        }
        var transplantCards = this.removeSelected();
        this.addTableauCard(transplantCards, column)
        this.resetSelection();
        this.setState({moves:this.state.moves + 1})
      }

    }

    emptyTableauClicked(column:number){
      if (this.state.selectedCard == null) {
        return;
      }
      if (!this.canMoveCard(this.state.selectedSrc, this.state.selectedCard, Constants.PileType.EMPTYTABLEAU, null)) {
        return;
      }
      var transplantCards = this.removeSelected();
      this.addTableauCard(transplantCards, column)
      this.resetSelection();
      this.setState({moves:this.state.moves + 1})
    }


    addTableauCard(cards: PlayingCards.Card[], column: number){
      let piles = this.state.tableauPiles;
      let destPile = piles[column];
      piles[column] = destPile.concat(cards);
    }

    removeSelected(){
      let transplantCards = [];
      switch(this.state.selectedSrc){
        case Constants.PileType.TABLEAUPILE:
          transplantCards = this.removeTableauCard(this.state.selectedColumn, this.state.selectedRow);
          break;
        case Constants.PileType.STOCK:
          transplantCards = this.removeStockCard();
          break;
        case Constants.PileType.FOUNDATION:
          transplantCards = this.removeFoundationCard(this.state.selectedColumn);
          break;
      }
      return transplantCards;
    }

    removeTableauCard(column: number, row: number) : PlayingCards.Card[]{
      let srcPile = this.state.tableauPiles[column];
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

    removeFoundationCard(foundation:number) : PlayingCards.Card[]{
      var card = this.state.foundationPiles[foundation].pop();
      return [card];
    }

    // movePiles(fromPile, column, row, toPile)
    //canMoveCard(this.state.selectedSrc, this.state.selectedCard, Constants.PileType.TABLEAU, card))
    canMoveCard(src:string, srcCard:PlayingCards.Card, dest:string, destCard:PlayingCards.Card) : boolean{
      switch(dest){
        case Constants.PileType.TABLEAUPILE:
          return destCard.getColor() != srcCard.getColor() && destCard.rank == srcCard.rank + 1;
        case Constants.PileType.EMPTYTABLEAU:
          return srcCard.rank == PlayingCards.Rank.King;
        case Constants.PileType.FOUNDATION:
          return srcCard.rank == destCard.rank + 1;
        default:
          return false;
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
        this.setState({moves:this.state.moves + 1})
    };

    render() {
        return (
          <div className="Solitaire" style={{
            width:"670px",
            margin: "0 auto",
            color: "white"
          }}>
            <div className="diagnostics" style={{
              textAlign: "center"
            }}>
              {this.state.moves} {this.state.moves == 1 ? "move" : "moves"}
            </div>
            <div className="">
              <div className="">
                  <div className="Stock" style={{
                      width: "255px",
                      margin: "10px 15px 0 20px",
                      float: "left"
                  }}>
                    <img src='img/cards/back-purple.png' onClick={this.stockClicked.bind(this)} style={{
                     width: "80px",
                     height: "112px",
                     cursor: "pointer",
                     float:"left"
                    }}/>
                    <Pile layout={PlayingCards.Layout.FannedRight} selectedCard={this.state.selectedCard} notifySelected={this.wasteClicked} pile={this.state.waste} pileStyle={{
                          float:"left",
                          marginLeft:"75px"}} />
                  </div>
              </div>
              <div>
                {this.state.foundationPiles.map((pile, foundation)  =>
                    <Foundation selectedCard={this.state.selectedCard} notifySelected={this.foundationClicked} pile={pile} column={foundation} suit={PlayingCards.Suit[foundation]} />
                  )}
              </div>
            </div>
            <div style={{padding:"20px 10px 0", float: "right"}}>
              {this.state.tableauPiles.map((pile, tableau)  =>
                  <Tableau selectedCard={this.state.selectedCard} tableauPileClicked={this.tableauPileClicked} emptyTableauClicked={this.emptyTableauClicked} pile={pile} column={tableau}/>
                )}
            </div>
          </div>
        );
      }
}
