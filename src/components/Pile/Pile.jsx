"use strict";
var React = require("react");
var PlayingCards = require('../../models/playing-cards');
var KlondikeCard = require('../KlondikeCard/KlondikeCard');
class Pile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let pileStyle = this.props.pileStyle || {};
        let cardStyle = this.props.cardStyle || {};
        switch (this.props.layout) {
            case PlayingCards.Layout.Squared:
                pileStyle = Object.assign(pileStyle, { position: "relative", width: "80px", height: "112px" });
                cardStyle = Object.assign(cardStyle, { position: "absolute" });
                break;
            case PlayingCards.Layout.FannedRight:
                pileStyle = Object.assign(pileStyle, { margin: "0 5px" });
                cardStyle = Object.assign(cardStyle, { float: "left", marginLeft: "-65px" });
                break;
            case PlayingCards.Layout.FannedDown:
            default:
                pileStyle = Object.assign(pileStyle, { float: "left", paddingTop: "95px" });
                cardStyle = Object.assign(cardStyle, { marginTop: "-95px" });
                break;
        }
        return (<div className="Pile" style={pileStyle}>
              {this.props.pile && this.props.pile.map((card, pos) => <KlondikeCard card={card} selected={this.props.selected} pileType={this.props.pileType} pileSize={this.props.pile.length} clickHandler={this.props.clickHandler} doubleClickHandler={this.props.doubleClickHandler} pos={pos} row={this.props.row} style={Object.assign(cardStyle, { zIndex: pos })}/>)}
            </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pile;
