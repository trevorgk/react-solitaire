import * as React from 'react';
import * as PlayingCards from '../../models/playing-cards';
import * as PileTypes from '../../constants/PileTypes';
import * as Pile from '../Pile/Pile';
import * as KlondikeCard from '../KlondikeCard/KlondikeCard';
export default class Foundation extends React.Component {
    constructor(props) {
        super(props);
    }
    emptyFoundationClicked() {
        if (this.props.clickHandler) {
            let card = this.props.pile.length > 0 ? this.props.pile[this.props.pile.length - 1] : null;
            this.props.clickHandler({ pileType: PileTypes.FOUNDATION, row: this.props.row, card });
        }
    }
    render() {
        let layout = PlayingCards.Layout.Squared;
        let card = this.props.pile.length > 0 ? this.props.pile[this.props.pile.length - 1] : null;
        let validDropTarget = this.props.selected != null && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.FOUNDATION, row: this.props.row, card });
        return (React.createElement("div", {"className": "Foundation", "onClick": this.props.pile.length == 0 && this.emptyFoundationClicked.bind(this), "style": {
            float: "left"
        }}, React.createElement("div", {"style": {
            position: "relative",
            width: "80px",
            height: "112px",
            border: "1px solid #CCC",
            borderRadius: "5px",
            margin: "10px 5px",
            backgroundImage: "url(" + PlayingCards.Card.getPip(this.props.suit) + ")",
            backgroundPosition: "18px 30px"
        }}, React.createElement(Pile, React.__spread({"layout": layout}, this.props)))));
    }
}
