import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import * as klondikeActions from 'redux/modules/klondike';
import * as PlayingCards from 'models/PlayingCards';
import * as PileTypes from 'constants/PileTypes';
import {MoveTypes, Foundation, Pile, KlondikeCard, Tableau} from 'components';
import {connect} from 'react-redux';

@connect(state => ({
  klondike: state.klondike.data
}),
  dispatch => bindActionCreators(klondikeActions, dispatch))
export default class Klondike extends Component {

  static propTypes = {
    moveCount: PropTypes.number.isRequired,
    active: React.PropTypes.object,
    waste: React.PropTypes.array,
    tableauPiles: React.PropTypes.array.isRequired,
    foundationPiles: React.PropTypes.array.isRequired,
    undo: PropTypes.func.isRequired,
    stock: PropTypes.func.isRequired
  }

  render () {
    const {
      undo,
      stock,
      cardClicked,
      klondike: {
        moveCount,
        active,
        waste,
        tableauPiles,
        foundationPiles
      }
    } = this.props;
    //console.log('Klondike::render()', this.props);
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
              <input type="button" value="undo move" onClick={() => undo()}/>
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
              <Pile layout={PlayingCards.Layout.FannedRight} pileType={PileTypes.WASTE} selected={active} doubleClickHandler={this.processDoubleClick} clickHandler={this.processClick} pile={waste} pileStyle={{
                float: "left", marginLeft: "75px"
                }}/>
              </div>
            </div>
            <div>
              <Foundation piles={foundationPiles} cardClicked={cardClicked} />
            </div>
          </div>
          <div style={{
          padding: "20px 10px 0", float: "right"
          }}>
            <Tableau piles={tableauPiles} />
          </div>
        </div>
      </div>
    );
  }
}
