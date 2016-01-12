import React, {Component, PropTypes} from 'react';
import * as PlayingCards from 'models/PlayingCards';
import * as PileTypes from 'constants/PileTypes';
import {
  MoveTypes,
  Pile,
  KlondikeCard
} from 'components';

const Foundation = (props) => {
  const {
    piles,
    cardClicked
  } = props;
  const pileType = PileTypes.TABLEAUPILE;
  //console.log('Foundation::render()', props);

  return <div className="Foundation">
      {
        piles.map((pile, row) => {
          const clickTarget = {
            pileType,
            row
          };
          // let validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.EMPTYTABLEAU, row: this.props.row });
          return <div key={pileType + "-" + row} onClick={() => cardClicked(clickTarget)}
            style={{
              position: "relative", width: "80px", height: "112px", border: "1px solid #CCC", borderRadius: "5px", margin: "10px 5px", backgroundPosition: "18px 30px", float: "left"
            }}>
              <Pile layout={PlayingCards.Layout.FannedDown} pileType={pileType} row={row} pile={pile} />
            </div>
          })
      }
    </div>
  };

  export default Foundation;

  // static propTypes = {
  //   pile: PropTypes.array.isRequired,
  //   row: React.PropTypes.number.isRequired,
  //   clickHandler: React.PropTypes.func,
  //   selected: React.PropTypes.object,
  //   suit: React.PropTypes.string
  // }
  // constructor (props) {super(props);}

  // emptyFoundationClicked () {
  //   if(this.props.clickHandler) {
  //     let card = this.props.pile.length > 0
  //       ? this.props.pile[this.props.pile.length - 1]
  //       : null;
  //     this.props.clickHandler({pileType: PileTypes.FOUNDATION, row: this.props.row, card: card});
  //   }
  // }

    // onClick={
      // pile.length == 0 && (e) && clickHandler != null && ((e) => {
      //   clickHandler({pileType: PileTypes.EMPTYTABLEAU, row: row})
      // })
    // }
