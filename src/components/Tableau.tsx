/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import * as Common from '../Common';
import * as PlayingCards from '../playing-cards';
import KlondikeCard from './KlondikeCard';

interface Props extends React.Props<any> {
  pile: PlayingCards.Card[],
  row: number,
  selected: Common.ClickTarget,
  clickHandler: any,
  doubleClickHandler: any,
}

export default class Tableau extends React.Component<Props,any>{
    constructor(props) {
      super(props);
    }

    emptyPileClickHandler(event) {
      if (this.props.clickHandler){
        this.props.clickHandler({pileType: Common.PileType.EMPTYTABLEAU, row: this.props.row});
      }
    };

    render() {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selected} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });
        let validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard.canMove(this.props.selected,
          {pileType: Common.PileType.EMPTYTABLEAU, row: this.props.row});
        return (
          <div className="Tableau" onClick={this.props.pile.length == 0 && this.emptyPileClickHandler.bind(this)} style={{
              position: "relative",
              width: "80px",
              height: "112px",
              border: "1px solid #CCC",
              borderRadius: "5px",
              margin: "10px 5px",
              backgroundPosition: "18px 30px",
              float: "left"
            }}>
              <Pile layout={PlayingCards.Layout.FannedDown} pileType={Common.PileType.TABLEAUPILE} selected={this.props.selected}
              row={this.props.row} pile={this.props.pile} clickHandler={this.props.clickHandler} doubleClickHandler={this.props.doubleClickHandler}/>
              {/*validDropTarget && KlondikeCard.renderOverlay('orange')*/}
            </div>
        );
    }
}
