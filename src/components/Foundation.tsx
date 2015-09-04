/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import * as Constants from '../Constants';
import * as PlayingCards from '../playing-cards';

interface Props extends React.Props<any> {
  pile: PlayingCards.Card[],
  row: number,
  handler?: (Constants.ClickTarget) => void,
  selectedCard: PlayingCards.Card,
  suit: PlayingCards.Suit
}

export default class Foundation extends React.Component<Props,{}> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handler(target) {
    this.props.handler({pileType: Constants.ClickTarget.FOUNDATION, row: this.props.row});
  };

  render() {
    let layout = PlayingCards.Layout.Squared;
    let pile = <Pile layout={layout} selectedCard={this.props.selectedCard} pile={this.props.pile} />;
    return (
      <div className="Foundation" onClick={this.handleClick.bind(this)} style={{
        float: "left"
      }}>
        <div style={{
          width: "80px",
          height: "112px",
          border: "1px solid #CCC",
          borderRadius: "5px",
          margin: "10px 5px",
          backgroundImage: "url(" + PlayingCards.Card.getPip(this.props.suit) + ")",
          backgroundPosition: "18px 30px"
        }}>
          {pile}
        </div>
      </div>
    );}

  }
