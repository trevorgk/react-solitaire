/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import KlondikeCard from './KlondikeCard';
import * as PlayingCards from '../playing-cards';
import * as Common from '../Common';

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
                pileStyle = React.addons.update({position: "relative", width: "80px", height: "112px"}, {$merge: pileStyle});
                cardStyle = React.addons.update({position: "absolute"}, {$merge: cardStyle});
                break;
            case PlayingCards.Layout.FannedRight:
                pileStyle = React.addons.update({
                    //clear:"both",
                    margin:"0 5px"}, {$merge: pileStyle});
                cardStyle = React.addons.update({float:"left", marginLeft:"-65px"}, {$merge: cardStyle});
                break;
            case PlayingCards.Layout.FannedDown:
            default:
                pileStyle = React.addons.update({float:"left", paddingTop:"95px"}, {$merge: pileStyle});
                cardStyle = React.addons.update({marginTop:"-95px"}, {$merge: cardStyle});
                break;
        }
        // let cards = this.props.pile.map(function(card, z){
        //     return <KlondikeCard card={card} style={React.addons.update({zIndex:z}, {$merge: cardStyle})} />
        // });

        return (
            <div className="Pile" style={pileStyle}>
              {this.props.pile && this.props.pile.map((card, pos) =>
                  <KlondikeCard card={card} selected={this.props.selected} pileType={this.props.pileType} pileSize={this.props.pile.length}
                  clickHandler={this.props.clickHandler} doubleClickHandler={this.props.doubleClickHandler} pos={pos} row={this.props.row}
                  style={React.addons.update({zIndex:pos}, {$merge: cardStyle})} />
              )}
            </div>
        );
    }
}
