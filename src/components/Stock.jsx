import React, { PropTypes } from 'react';
import Pile from './Pile';

export default class Stock extends React.Component{

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

    render() {
        return (
            <div className="Stock" style={{
                width: "240px",
                margin: "10px 15px",
                float: "left"
            }}>
            <img src={Card.backFace} onClick={this.handleClick.bind(this)} style={{
               width: "80px",
               height: "112px",
               cursor: "pointer",
               float:"left"
              }}/>

                <Pile pile={this.state.waste} layout={Layout.FannedRight} pileStyle={{
                    float:"left",
                    marginLeft:"75px"}} />
            </div>
        );
    }
}
