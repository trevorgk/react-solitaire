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
  elapsed: number,
}

interface State {
  src?: Constants.ClickTarget,
  moves?: number,
  deck?: PlayingCards.DeckOfCards,
  waste?: PlayingCards.Card[],
  foundationPiles?: PlayingCards.Card[][],
  tableauPiles?: PlayingCards.Card[][],
}


export default class Solitaire extends React.Component<Props,State>{

    constructor(props) {
      super(props);
      this.processMove = this.processMove.bind(this);
      this.canMove = this.canMove.bind(this);

      let deck = new PlayingCards.DeckOfCards(false);
      deck.shuffle();

      let tableauPiles = (function(pileCount: number, deck: PlayingCards.DeckOfCards) {
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
      })(this.props.pileCount, deck);

      let foundationPiles = (function() {
        return [[],[],[],[]];
      })();

      this.state = {deck: deck, tableauPiles: tableauPiles, foundationPiles: foundationPiles, moves:0, waste: PlayingCards.Card[0]};
    }

    resetSelection(){
      this.setState({src: null});
    }

    revealTopCard(pile:PlayingCards.Card[]){
      if (pile.length == 0) return;
      pile[pile.length - 1].show = true;
    }

    processClick(target:Constants.ClickTarget){
      if (this.state.src == null){
        this.setState({src: target});
      }
      else if (this.state.src.card.toString() == target.card.toString()){
        this.setState({src: null});
      }
      else {
        if (this.canMove(this.state.src, target)){
          this.processMove(this.state.src, target);
        }
      }
    }

    canMove(src:Constants.ClickTarget, dest: Constants.ClickTarget) : boolean{
      switch(dest.pileType){
        case Constants.PileType.TABLEAUPILE:
          return src.card.getColor() != dest.card.getColor() && src.card.rank == dest.card.rank - 1;
        case Constants.PileType.EMPTYTABLEAU:
          return src.card.rank == PlayingCards.Rank.King;
        case Constants.PileType.FOUNDATION:
          return src.card.suit == dest.row && (
            (this.state.foundationPiles[dest.row].length == 0 && src.card.rank == PlayingCards.Rank.Ace) || src.card.rank == dest.card.rank + 1);
        default:
          return false;
      }
      return false;
    }

    processMove(src:Constants.ClickTarget, dest: Constants.ClickTarget){
      let transplantCards = [];
      switch(src.pileType){
        case Constants.PileType.TABLEAUPILE:
          var tableauPile = this.state.tableauPiles[this.state.src.row];
          transplantCards = tableauPile.splice(this.state.src.pos, tableauPile.length - this.state.src.pos);
          this.revealTopCard(tableauPile);
          break;
        case Constants.PileType.STOCK:
          var card = this.state.waste.pop();
          this.revealTopCard(this.state.waste);
          transplantCards = [card];
          break;
        case Constants.PileType.FOUNDATION:
          transplantCards = (function(foundationPile:PlayingCards.Card[]) : PlayingCards.Card[]{
            var card = foundationPile.pop();
            return [card];
          })(this.state.foundationPiles[this.state.src.row]);
          break;
      }
      if (transplantCards.length == 0){
        throw "Cards required for move";
      }

      let foundationPiles = this.state.foundationPiles;
      let tableauPiles = this.state.tableauPiles;

      switch (dest.pileType){
        case Constants.PileType.TABLEAUPILE:
        case Constants.PileType.EMPTYTABLEAU:
          tableauPiles[dest.pos] = tableauPiles[dest.row].concat(transplantCards);
          break;
        case Constants.PileType.FOUNDATION:
          foundationPiles[dest.row].concat(transplantCards);
          break;
        }

      this.resetSelection();
      this.setState({foundationPiles})
      this.setState({moves:this.state.moves + 1})
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
        if (this.state.src.pileType == Constants.PileType.STOCK){
          this.resetSelection();
        }
        this.setState({moves:this.state.moves + 1})
    };

    render() {
        var elapsed = Math.round(this.props.elapsed  / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
        return (
          <div className="Solitaire" style={{
            width:"670px",
            margin: "0 auto",
            color: "white"
          }}>
            <div className="diagnostics" style={{
              textAlign: "center"
            }}>
               {seconds} seconds | {this.state.moves} {this.state.moves == 1 ? "move" : "moves"}
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
                    <Pile layout={PlayingCards.Layout.FannedRight} selected={this.state.src} handler={this.processClick} pile={this.state.waste} pileStyle={{
                          float:"left",
                          marginLeft:"75px"}} />
                  </div>
              </div>
              <div>
                {this.state.foundationPiles.map((pile, foundation)  =>
                    <Foundation selected={this.state.src} handler={this.processClick} pile={pile} row={foundation} suit={PlayingCards.Suit[foundation]} />
                  )}
              </div>
            </div>
            <div style={{padding:"20px 10px 0", float: "right"}}>
              {this.state.tableauPiles.map((pile, tableau)  =>
                  <Tableau selected={this.state.src} handler={this.processClick} pile={pile} row={tableau}/>
                )}
            </div>
          </div>
        );
      }
}
