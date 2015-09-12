/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import * as PlayingCards from '../playing-cards';
import * as Common from '../Common';

interface Props extends React.Props<any> {
  card: PlayingCards.Card,
  clickHandler: any,
  selected: Common.ClickTarget
  pos?: number,
  row?: number,
  pileSize?: number,
  style?: any,
  pileType: string
}

export default class KlondikeCard extends React.Component<Props, {}>  {

  constructor(props) {
    super(props);
  }

  public static canMove(src:Common.ClickTarget, dest: Common.ClickTarget) : boolean{
    switch(dest.pileType){
      case Common.PileType.TABLEAUPILE:
        return dest.pos == dest.pileSize - 1 && src.card.getColor() != dest.card.getColor() && src.card.rank == dest.card.rank - 1;
      case Common.PileType.EMPTYTABLEAU:
        return src.card.rank == PlayingCards.Rank.King;
      case Common.PileType.FOUNDATION:
        if (src.pileType == Common.PileType.TABLEAUPILE && src.pos != src.pileSize - 1) return false;
        return src.card.suit == dest.row && (
          (src.card.rank == PlayingCards.Rank.Ace) || (dest.card && src.card.rank == dest.card.rank + 1));
      default:
        return false;
    }
    return false;
  }

  public static renderOverlay(color){
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}></div>
    );
  }

  handleClick() {
      this.props.clickHandler({card: this.props.card, pos: this.props.pos, pileSize: this.props.pileSize});
  };

  render() {
      let style = React.addons.update({position: "relative", width:"80px",height:"112px"}, {$merge: this.props.style});
      let selected = this.props.selected != null && this.props.selected.card.toString() == this.props.card.toString();
      let validDropTarget = !selected && this.props.card.show && this.props.selected != null && KlondikeCard.canMove(this.props.selected,
        {pileType: this.props.pileType, card: this.props.card, row: this.props.row, pos: this.props.pos, pileSize: this.props.pileSize})
      return (
          <div className="KlondikeCard" onClick={this.props.card.show && this.handleClick.bind(this)} style={style}>
              <img style={{width:"100%"}} src={this.props.card.display()} />
              {selected && KlondikeCard.renderOverlay('aquamarine')}
              {validDropTarget && KlondikeCard.renderOverlay('orange')}
          </div>
      );
  }
}
