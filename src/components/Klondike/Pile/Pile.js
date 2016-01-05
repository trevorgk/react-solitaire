import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as klondikeActions from 'redux/modules/klondike';
import * as PlayingCards from '../../../models/PlayingCards';
import {KlondikeCard} from 'components';

export default class Pile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      const {
        pile,
        pileType,
        clickHandler,
        doubleClickHandler,
        row,
        layout
      } = this.props;
        //console.log('Pile::render()', this.props);
        let pileStyle = this.props.pileStyle || {};
        let cardStyle = this.props.cardStyle || {};
        switch (layout) {
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
              {pile && pile.map((card, pos) => <KlondikeCard card={card} pos={pos} row={row} pileType={pileType} style={Object.assign(cardStyle, { zIndex: pos })}/>)}
            </div>);
    }
}
