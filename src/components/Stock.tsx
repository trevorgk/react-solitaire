/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import * as PlayingCards from '../playing-cards';

interface Props extends React.Props<any> {
  cards: PlayingCards.DeckOfCards,
  clickHandler: any,
  selected: PlayingCards.Card
}

export default class Stock extends React.Component<Props,any>{

    constructor(props) {
      super(props);
      this.state = {waste: []};
    }

    handleClick(event) {
        const wasteSize = 3;
        let cards = this.props.cards.concat(this.state.waste.reverse());
        let waste = [];
        for (let i = 0; i < wasteSize; i++){
            let card = cards.getNextCard();
            card.show = i == wasteSize - 1;
            waste.push(card);
        }
        this.setState({waste: waste});
        console.log('cards in deck', this.props.cards.toString());
    };

    popTop(){
      return this.state.waste.pop();
    }

    render() {
        let pileStyle={
          float:"left",
          marginLeft:"75px"
        };
        return (
            <div className="Stock" style={{
                width: "240px",
                margin: "10px 15px",
                float: "left"
            }}>
              <img src='img/cards/back-purple.png' onClick={this.handleClick.bind(this)} style={{
               width: "80px",
               height: "112px",
               cursor: "pointer",
               float:"left"
              }}/>
              <Pile layout={PlayingCards.Layout.FannedRight} selected={this.props.selected} clickHandler={this.props.clickHandler} pile={this.state.waste} pileStyle={{
                    float:"left",
                    marginLeft:"75px"}} />
            </div>
        );
    }
}
