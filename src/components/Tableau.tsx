/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import * as PlayingCards from '../playing-cards';

interface Props extends React.Props<any> {
  pile: PlayingCards.Card[],
  column: number,
  selectedCard: PlayingCards.Card,
  tableauPileClicked: any,
  tableauClicked: any,
}

export default class Tableau extends React.Component<Props,any>{
    constructor(props) {
      super(props);
    }

    handleClick(event) {
        this.props.tableauClicked(this.props.column);
    };

    render() {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selectedCard} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });

        return (
          <div className="Tableau" onClick={this.props.pile.length == 0 && this.handleClick.bind(this)} style={{
              width: "80px",
              height: "112px",
              border: "1px solid #CCC",
              borderRadius: "5px",
              margin: "10px 5px",
              backgroundPosition: "18px 30px",
              float: "left"
            }}>
              <Pile layout={PlayingCards.Layout.FannedDown} selectedCard={this.props.selectedCard} column={this.props.column} notifySelected={this.props.tableauPileClicked} pile={this.props.pile} />
            </div>
        );
    }
}
