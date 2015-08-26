/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import * as PlayingCards from '../playing-cards';

interface Props extends React.Props<any> {
  piles: PlayingCards.Card[][],
  selectedCard: PlayingCards.Card,
  notifySelected: any,
}

export default class Tableau extends React.Component<Props,any>{
    constructor(props) {
      super(props);
    }

    render() {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selectedCard} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });

        return (
            <div className="Tableau" style={{padding:"130px 10px 120px", float: "right"}}>
                  {this.props.piles.map((pile, column) =>
                    <div style={{
                      width: "80px",
                      height: "112px",
                      border: "1px solid #CCC",
                      borderRadius: "5px",
                      margin: "10px 5px",
                      backgroundPosition: "18px 30px",
                      float: "left"
                    }}>
                      <Pile layout={PlayingCards.Layout.FannedDown} selectedCard={this.props.selectedCard} column={column} notifySelected={this.props.notifySelected} pile={pile} />
                    </div>
                  )}
            </div>
        );
    }
}
