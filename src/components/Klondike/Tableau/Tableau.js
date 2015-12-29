import React, {Component, PropTypes} from 'react';
import * as PlayingCards from '../../../models/PlayingCards';
import * as PileTypes from '../../../constants/PileTypes';
import {
  Pile,
  KlondikeCard,
} from 'components';

const Tableau = (props) => {
  const {piles, selected, clickHandler, doubleClickHandler} = props;
  //console.log('Tableau::render()', props);
  return <div>{
    piles.map((pile, row) => {
    // let validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.EMPTYTABLEAU, row: this.props.row });
    return <div className="Tableau" onClick={pile.length == 0 && (e) && clickHandler != null && ((e) => {clickHandler({ pileType: PileTypes.EMPTYTABLEAU, row: row })})} style={{
        position: "relative",
        width: "80px",
        height: "112px",
        border: "1px solid #CCC",
        borderRadius: "5px",
        margin: "10px 5px",
        backgroundPosition: "18px 30px",
        float: "left"
    }}>
          <Pile layout={PlayingCards.Layout.FannedDown} pileType={PileTypes.TABLEAUPILE} selected={selected} row={row} pile={pile} clickHandler={clickHandler} doubleClickHandler={doubleClickHandler}/>
        </div>
      })
    }</div>
  };

export default Tableau;
