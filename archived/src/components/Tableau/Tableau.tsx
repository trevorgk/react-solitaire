/// <reference path="../../../typings/tsd.d.ts" />
import * as React from "react";
import * as PlayingCards from '../../models/playing-cards';
import * as PileTypes from '../../constants/PileTypes';
import * as Common from '../../Common';
import * as Pile from '../Pile/Pile';
import * as KlondikeCard from '../KlondikeCard/KlondikeCard';

interface Props {
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
        this.props.clickHandler({pileType: PileTypes.EMPTYTABLEAU, row: this.props.row});
      }
    };

    render() {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selected} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });
        let validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard.canMove(this.props.selected,
          {pileType: PileTypes.EMPTYTABLEAU, row: this.props.row});
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
              <Pile layout={PlayingCards.Layout.FannedDown} pileType={PileTypes.TABLEAUPILE} selected={this.props.selected}
              row={this.props.row} pile={this.props.pile} clickHandler={this.props.clickHandler} doubleClickHandler={this.props.doubleClickHandler}/>
              {/*validDropTarget && KlondikeCard.renderOverlay('orange')*/}
            </div>
        );
    }
}
