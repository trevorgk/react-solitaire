import React, { PropTypes } from 'react';

export default class Stock {

    getInitialState() {
        return {waste: []};
    };

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
                <Pile pile={this.props.cards} onClick={this.handleClick} layout={Layout.Squared} />

                <Pile pile={this.state.waste} layout={Layout.FannedRight} pileStyle={{
                    float:"left",
                    marginLeft:"75px"}} />
            </div>
        );
    }
}
