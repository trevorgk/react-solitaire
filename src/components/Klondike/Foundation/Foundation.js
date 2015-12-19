import React, {Component, PropTypes} from 'react';
import * as PlayingCards from '../../../models/PlayingCards';
import * as PileTypes from '../../../constants/PileTypes';
import {MoveTypes, Pile, KlondikeCard} from 'components';

export default class Foundation extends Component {
  static propTypes = {
    pile: PropTypes.array.isRequired,
    row: React.PropTypes.number.isRequired,
    clickHandler: React.PropTypes.func,
    selected: React.PropTypes.object,
    suit: React.PropTypes.string
  }
  constructor (props) {super(props);}

  emptyFoundationClicked () {
    if(this.props.clickHandler) {
      let card = this.props.pile.length > 0
        ? this.props.pile[this.props.pile.length - 1]
        : null;
      this.props.clickHandler({pileType: PileTypes.FOUNDATION, row: this.props.row, card: card});
    }
  }

  render () {
    let layout = PlayingCards.Layout.Squared;
    let card = this.props.pile.length > 0
      ? this.props.pile[this.props.pile.length - 1]
      : null;
    //todo let validDropTarget = this.props.selected != null && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.FOUNDATION, row: this.props.row, card: card });
    return (
      <div className="Foundation" onClick={this.props.pile.length == 0 && this.emptyFoundationClicked.bind(this)} style={{
      float: "left"
      }}>
        <div style={{
        position: "relative", width: "80px", height: "112px", border: "1px solid #CCC", borderRadius: "5px", margin: "10px 5px", backgroundImage: "url(" + PlayingCards. Card. getPip( this. props. suit) + ")", backgroundPosition: "18px 30px"
        }}>
          <Pile layout={layout} {...this.props}/>
        </div>
      </div>
    );
  }
}
