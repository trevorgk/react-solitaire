import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as klondikeActions from 'redux/modules/klondike';
import * as PlayingCards from '../../../models/playing-cards';

export default class KlondikeCard extends Component {

    constructor(props) {
        super(props);
        this.clickTimeoutId = null;
        this.handleClick = this.handleClick.bind(this);
    }

    static renderOverlay(color) {
        return (<div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: color,
        }}></div>);
    }

    handleClick() {
      const {
        card,
        pileType,
        row,
        pos,
        pileSize,
        clickHandler,
        doubleClickHandler,
      } = this.props;
      const doubleClickDelay = 225;
      let payload = { pileType: pileType, row: row, card: card, pos: pos, pileSize: pileSize };
      if (!this.clickTimeoutId) {
          this.clickTimeoutId = setTimeout(() => {
              clickHandler(payload);
              this.clickTimeoutId = null;
          }, doubleClickDelay);
      }
      else {
          this.clickTimeoutId = clearTimeout(this.clickTimeoutId);
          doubleClickHandler(payload);
      }
    }

    render() {
      const {
        card,
        pileType,
        row,
        pos,
        pileSize,
        clickHandler,
        doubleClickHandler,
      } = this.props;
      console.log('KlondikeCard::render()', this.props);
      let style = Object.assign(this.props.style, { position: "relative", width: "80px", height: "112px" });
      let selected = selected != null && selected.card.toString() == card.toString();
      //  todo let validDropTarget = !selected && card.show && selected != null && KlondikeCard.canMove(selected, { pileType: pileType, card: card, row: row, pos: pos, pileSize: pileSize });
      return (
        <div className="KlondikeCard" onClick={card.show && this.handleClick.bind(this)} style={style}>
          <img style={{ width: "100%" }} src={card.display()}/>
          {selected && KlondikeCard.renderOverlay('aquamarine')}
        </div>);
    }
}
