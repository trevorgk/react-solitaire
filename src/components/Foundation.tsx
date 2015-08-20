/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import Pile from './Pile';
import * as PlayingCards from '../playing-cards';

interface Props extends React.Props<any> {
  pile: PlayingCards.Card[],
  column: number,
  notifySelected?: any,
}

export default class Foundation extends React.Component<Props,{}> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.notifySelected(this.props.column);
  };

  render() {
    let layout = PlayingCards.Layout.Squared;
    let style1 = {
      width: "80px",
      height: "112px",
      border: "1px solid #CCC",
      borderRadius: "5px",
      margin: "10px 5px"
    };
    let style2 = {
      float: "left"
    };
    let pile = <Pile layout={layout} pile={this.props.pile} />
    return (
      <div className="Foundation" onClick={this.handleClick.bind(this)} style={style2}>
        <div style={style1}>
          {pile}
        </div>
      </div>
    );}

  }
