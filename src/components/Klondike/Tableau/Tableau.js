import React, {Component, PropTypes} from 'react';
import * as PlayingCards from 'models/PlayingCards';
import * as PileTypes from 'constants/PileTypes';
import {
  Pile,
  KlondikeCard,
} from 'components';

const Tableau = (props) => {
  const {
    piles,
    cardClicked
  } = props;
  const pileType = PileTypes.TABLEAUPILE;
  const handleClick = function(row) {
    cardClicked({ pileType: PileTypes.EMPTYTABLEAU, row });
  }
  return <div>{
    piles.map((pile, row) => {
    // let validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.EMPTYTABLEAU, row: this.props.row });
    return <div className="Tableau" key={pileType + "-" + row} data-row={row} onClick={pile.length == 0 && handleClick.bind(null, row)}
      style={{
        position: "relative",
        width: "80px",
        height: "112px",
        border: "1px solid #CCC",
        borderRadius: "5px",
        margin: "10px 5px",
        backgroundPosition: "18px 30px",
        float: "left"
      }}>
          <Pile layout={PlayingCards.Layout.FannedDown} pileType={pileType} row={row} pile={pile} />
        </div>
      })
    }</div>
  };

export default Tableau;
