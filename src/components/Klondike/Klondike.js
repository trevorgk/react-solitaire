import React, {Component, PropTypes} from 'react';
import * as klondikeActions from 'redux/modules/klondike';
import * as PlayingCards from '../../models/playing-cards';
import * as PileTypes from '../../constants/PileTypes';
import {MoveTypes, Foundation, Pile, KlondikeCard, Tableau} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(state => ({
  klondike: state.klondike.data
}),
  dispatch => bindActionCreators(klondikeActions, dispatch))
export default class Klondike extends Component {

  constructor(props) {
    super(props);
    this.processClick = this.processClick.bind(this);
    this.processDoubleClick = this.processDoubleClick.bind(this);
    this.move = this.move.bind(this);
    this.logMove = this.logMove.bind(this);
  }

  render () {
    const {
      moveCount,
      src,
      waste,
      tableauPiles,
      foundationPiles
    } = this.props;
    return (
      <div className="Solitaire">
        <div style={{
        width: "670px", margin: "0 auto", color: "white"
        }}>
          <div style={{
          textAlign: "center"
          }}>
            {moveCount}
            {moveCount == 1
              ? "move"
              : "moves"}
            <div>
              <input type="button" value="undo move" onClick={this.undoClicked.bind(this)}/>
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="Stock" style={{
              width: "255px", margin: "10px 15px 0 20px", float: "left"
              }}>
                <img src='cards/back-purple.png'
                  onClick={() => stock()}
                  style={{
                width: "80px", height: "112px", cursor: "pointer", float: "left"
                }}/>
                <Pile layout={PlayingCards.Layout.FannedRight} pileType={PileTypes.WASTE} selected={src} doubleClickHandler={this.processDoubleClick} clickHandler={this.processClick} pile={waste} pileStyle={{
                float: "left", marginLeft: "75px"
                }}/>
              </div>
            </div>
            <div>
              {foundationPiles.map((pile, foundation) => <Foundation selected={src} clickHandler={this.processClick} pile={pile} row={foundation} suit={PlayingCards.Suit[foundation]}/>)}
            </div>
          </div>
          <div style={{
          padding: "20px 10px 0", float: "right"
          }}>
            {tableauPiles.map((pile, tableau) => <Tableau selected={src} clickHandler={this.processClick} doubleClickHandler={this.processDoubleClick} pile={pile} row={tableau}/>)}
          </div>
        </div>
      </div>
    );
  }
}
