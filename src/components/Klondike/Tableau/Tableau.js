import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as klondikeActions from 'redux/modules/klondike';
import * as PlayingCards from '../../../models/PlayingCards';
import * as PileTypes from '../../../constants/PileTypes';
import {
  Pile,
  KlondikeCard,
} from 'components';

export default class Tableau extends Component {
    constructor(props) {
        super(props);
    }
    emptyPileClickHandler(event) {
        if (this.props.clickHandler) {
            this.props.clickHandler({ pileType: PileTypes.EMPTYTABLEAU, row: this.props.row });
        }
    }

    render() {
        let validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.EMPTYTABLEAU, row: this.props.row });
        return (<div className="Tableau" onClick={this.props.pile.length == 0 && this.emptyPileClickHandler.bind(this)} style={{
            position: "relative",
            width: "80px",
            height: "112px",
            border: "1px solid #CCC",
            borderRadius: "5px",
            margin: "10px 5px",
            backgroundPosition: "18px 30px",
            float: "left"
        }}>
              <Pile layout={PlayingCards.Layout.FannedDown} pileType={PileTypes.TABLEAUPILE} selected={this.props.selected} row={this.props.row} pile={this.props.pile} clickHandler={this.props.clickHandler} doubleClickHandler={this.props.doubleClickHandler}/>

            </div>);
    }
}
