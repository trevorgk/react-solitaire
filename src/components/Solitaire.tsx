/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import Foundation from './Foundation';
import KlondikeCard from './KlondikeCard';
import Tableau from './Tableau';
import Diagnostics from './Diagnostics';
import * as Common from '../Common';
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
  src?: Common.ClickTarget,
  moves?: number,
  initialDeckSize?: number,
  deck?: PlayingCards.DeckOfCards,
  waste?: PlayingCards.Card[],
  foundationPiles?: PlayingCards.Card[][],
  tableauPiles?: PlayingCards.Card[][],
}


export default class Solitaire extends React.Component<Props,State>{

    constructor(props) {
      super(props);
      this.processClick = this.processClick.bind(this);
      this.move = this.move.bind(this);

      let deck = new PlayingCards.DeckOfCards(false);
      deck.shuffle();

      // let trash = deck.getNextCards(20);

      let initialDeckSize = deck.length();

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
      this.state = {deck, tableauPiles, foundationPiles, moves:0, waste: [], initialDeckSize};
      console.log(this.state);
    }

    resetSelection(){
      this.setState({src: null});
    }

    revealTopCard(pile:PlayingCards.Card[]){
      if (pile.length == 0) return;
      pile[pile.length - 1].show = true;
    }

    processClick(target:Common.ClickTarget){
      console.log('processClick', target);
      if (this.state.src == null){
        this.setState({src: target});
      }
      else if (this.state.src.card == target.card){
        this.setState({src: null});
      }
      else {
        if (Common.canMove(this.state.src, target)){
          this.move(this.state.src, target);
        }
      }
    }

    move(src:Common.ClickTarget, dest: Common.ClickTarget){
      let transplantCards = [];
      switch(src.pileType){
        case Common.PileType.TABLEAUPILE:
          var tableauPile = this.state.tableauPiles[this.state.src.row];
          transplantCards = tableauPile.splice(this.state.src.pos, tableauPile.length - this.state.src.pos);
          this.revealTopCard(tableauPile);
          break;
        case Common.PileType.WASTE:
          var card = this.state.waste.pop();
          this.revealTopCard(this.state.waste);
          transplantCards = [card];
          break;
        case Common.PileType.FOUNDATION:
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
        case Common.PileType.TABLEAUPILE:
        case Common.PileType.EMPTYTABLEAU:
          tableauPiles[dest.row] = tableauPiles[dest.row].concat(transplantCards);
          break;
        case Common.PileType.FOUNDATION:
          foundationPiles[dest.row] = foundationPiles[dest.row].concat(transplantCards);
          break;
        }

      this.resetSelection();
      this.setState({foundationPiles})
      this.setState({moves:this.state.moves + 1})
    }

    stockClicked(event) {
        let deck = this.state.deck.concat(this.state.waste.reverse());

        let wasteSize = 3;
        if (this.state.deck.length() < wasteSize){
          wasteSize = this.state.deck.length();
        }

        let waste = [];
        for (let i = 0; i < wasteSize; i++){
            let card = deck.getNextCard();
            card.show = i == wasteSize - 1;
            waste.push(card);
        }
        this.setState({waste, deck});
        if (this.state.src && this.state.src.pileType == Common.PileType.WASTE){
          this.resetSelection();
        }
        this.setState({moves:this.state.moves + 1})
    };

    render() {
        var elapsed = Math.round(this.props.elapsed  / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
        return (
          <div className="Solitaire">
            <Diagnostics initialDeckSize={this.state.initialDeckSize} deck={this.state.deck} foundations={this.state.foundationPiles} tableaus={this.state.tableauPiles} waste={this.state.waste} />
            <div style={{
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
                      <Pile layout={PlayingCards.Layout.FannedRight} pileType={Common.PileType.WASTE} selected={this.state.src} clickHandler={this.processClick} pile={this.state.waste} pileStyle={{
                            float:"left",
                            marginLeft:"75px"}} />
                    </div>
                </div>
                <div>
                  {this.state.foundationPiles.map((pile, foundation)  =>
                      <Foundation selected={this.state.src} clickHandler={this.processClick} pile={pile} row={foundation} suit={PlayingCards.Suit[foundation]} />
                    )}
                </div>
              </div>
              <div style={{padding:"20px 10px 0", float: "right"}}>
                {this.state.tableauPiles.map((pile, tableau)  =>
                    <Tableau selected={this.state.src} clickHandler={this.processClick} pile={pile} row={tableau}/>
                  )}
              </div>
            </div>
          </div>

        );
      }
}
