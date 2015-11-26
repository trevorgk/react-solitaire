import * as React from "react";
import * as PlayingCards from '../../models/playing-cards';
import * as PileTypes from '../../constants/PileTypes';
import * as Common from '../../Common';
import {KlondikeCard} from './KlondikeCard';

interface Props extends React.Props<any> {
  layout: PlayingCards.Layout,
  pile: PlayingCards.Card[],
  clickHandler?: any,
  doubleClickHandler?: any,
  row?: number,
  pileStyle?: Object,
  cardStyle?: Object,
  selected?: Common.ClickTarget,
  pileType?: string
}

export default class Pile extends React.Component<Props,{}>{
    constructor(props) {
      super(props);
    }

    render() {
        let pileStyle = this.props.pileStyle || {};
        let cardStyle = this.props.cardStyle || {};

        switch(this.props.layout){
            case PlayingCards.Layout.Squared:
                pileStyle = Object.assign(pileStyle, {position: "relative", width: "80px", height: "112px"});
                cardStyle = Object.assign(cardStyle, {position: "absolute"});
                break;
            case PlayingCards.Layout.FannedRight:
                pileStyle = Object.assign(pileStyle, {margin:"0 5px"});
                cardStyle = Object.assign(cardStyle, {float:"left", marginLeft:"-65px"});
                break;
            case PlayingCards.Layout.FannedDown:
            default:
                pileStyle = Object.assign(pileStyle, {float:"left", paddingTop:"95px"});
                cardStyle = Object.assign(cardStyle, {marginTop:"-95px"});
                break;
        }
        // let cards = this.props.pile.map(function(card, z){
        //     return <KlondikeCard card={card} style={update({zIndex:z}, {$merge: cardStyle})} />
        // });

        return (
            <div className="Pile" style={pileStyle}>
              {this.props.pile && this.props.pile.map((card, pos) =>
                  <KlondikeCard card={card} selected={this.props.selected} pileType={this.props.pileType} pileSize={this.props.pile.length}
                  clickHandler={this.props.clickHandler} doubleClickHandler={this.props.doubleClickHandler} pos={pos} row={this.props.row}
                  style={Object.assign(cardStyle, {zIndex:pos})} />
              )}
            </div>
        );
    }
}
