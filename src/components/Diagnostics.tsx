/// <reference path="../../typings/react/react-addons.d.ts" />
import * as React from 'react';
import * as PlayingCards from '../playing-cards';
import * as Common from '../Common';

interface Props extends React.Props<any> {
  initialDeckSize: number,
  deck: PlayingCards.DeckOfCards,
  waste: PlayingCards.Card[],
  foundations: PlayingCards.Card[][],
  tableaus: PlayingCards.Card[][],
  moves?: Common.MoveHistory[]
}

export default class Diagnostics extends React.Component<Props, {}>  {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
      let deckLength = this.props.deck.length();
      let wasteLength = this.props.waste.length;
      let foundationLength:number = this.props.foundations.map((card) => card.length).reduce((prev, curr) => prev + curr);
      let tableauLength:number = this.props.tableaus.map((card) => card.length).reduce((prev, curr) => prev + curr);
      let total = deckLength + wasteLength + foundationLength + tableauLength;
      let initialDeckSize = this.props.initialDeckSize;
      return (
          <div className="Diagnostics" style={{float: "right", backgroundColor:"white"}}>
            <div style={{color: (total == initialDeckSize ? "green" : "red")}}>{total}</div>
            <div>stock: {deckLength}</div>
            <div>waste: {wasteLength}</div>
            <div>foundation: {foundationLength}</div>
            <div>tableau: {tableauLength}</div>
            <button onClick={() => console.log(this.props.moves)}>log history</button><br/>
            <button onClick={() => console.log(this.props.deck.toString())}>log stock</button>
          </div>
      );
  }
}
