/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import KlondikeCard from './KlondikeCard';
import * as Common from '../Common';
import * as PlayingCards from '../playing-cards';

interface Props extends React.Props<any> {
  pile: PlayingCards.Card[],
  row: number,
  clickHandler?: any,
  selected: Common.ClickTarget,
  suit: PlayingCards.Suit
}

export default class Foundation extends React.Component<Props,{}> {
  constructor(props) {
    super(props);
  }

  emptyFoundationClicked() {
    if (this.props.clickHandler){
      let card = this.props.pile.length > 0 ? this.props.pile[this.props.pile.length - 1] : null;
      this.props.clickHandler({pileType: Common.PileType.FOUNDATION, row: this.props.row, card});
    }
  }

  render() {
    let layout = PlayingCards.Layout.Squared;
    let card = this.props.pile.length > 0 ? this.props.pile[this.props.pile.length - 1] : null;
    let validDropTarget = this.props.selected != null && KlondikeCard.canMove(this.props.selected, {pileType: Common.PileType.FOUNDATION, row: this.props.row, card});
    return (
      <div className="Foundation"onClick={this.props.pile.length == 0 && this.emptyFoundationClicked.bind(this)} style={{
        float: "left"
      }}>
        <div style={{
          position: "relative",
          width: "80px",
          height: "112px",
          border: "1px solid #CCC",
          borderRadius: "5px",
          margin: "10px 5px",
          backgroundImage: "url(" + PlayingCards.Card.getPip(this.props.suit) + ")",
          backgroundPosition: "18px 30px"
        }}>
          <Pile layout={layout} pileType={Common.PileType.FOUNDATION} selected={this.props.selected} pile={this.props.pile} row={this.props.row} clickHandler={this.props.clickHandler}/>
          {/* validDropTarget && KlondikeCard.renderOverlay('orange')*/}
        </div>
      </div>
    );}

  }
