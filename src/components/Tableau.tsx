/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import * as Constants from '../Constants';
import * as PlayingCards from '../playing-cards';

interface Props extends React.Props<any> {
  pile: PlayingCards.Card[],
  row: number,
  selected: PlayingCards.Card,
  clickHandler: any,
}

export default class Tableau extends React.Component<Props,any>{
    constructor(props) {
      super(props);
    }

    emptyPileClicked(event) {
      if (this.props.clickHandler){
        this.props.clickHandler({pileType: Constants.PileType.EMPTYTABLEAU, row: this.props.row});
      }
    };

    render() {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selected} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });

        return (
          <div className="Tableau" onClick={this.props.pile.length == 0 && this.emptyPileClicked.bind(this)} style={{
              width: "80px",
              height: "112px",
              border: "1px solid #CCC",
              borderRadius: "5px",
              margin: "10px 5px",
              backgroundPosition: "18px 30px",
              float: "left"
            }}>
              <Pile layout={PlayingCards.Layout.FannedDown} pileType={Constants.PileType.TABLEAUPILE} selected={this.props.selected}
              row={this.props.row} pile={this.props.pile}  clickHandler={this.props.clickHandler} />
            </div>
        );
    }
}
