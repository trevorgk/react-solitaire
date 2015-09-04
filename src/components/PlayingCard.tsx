/// <reference path="../../typings/react/react-addons.d.ts" />
import React = require('react/addons');
import * as PlayingCards from '../playing-cards';
import * as Constants from '../Constants';

interface Props extends React.Props<any> {
  card: PlayingCards.Card,
  clickHandler: any,
  selected: Constants.ClickTarget
  pos?: number,
  style?: any,
}

export default class PlayingCard extends React.Component<Props, {}>  {

  constructor(props) {
    super(props);
    this.state = {isSelected: false};
  }

  renderOverlay(color){
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
      this.props.clickHandler({card: this.props.card, pos: this.props.pos});
  };

  render() {
      let style = React.addons.update({position: "relative", width:"80px",height:"112px"}, {$merge: this.props.style});
      let selected = this.props.selected != null && this.props.selected.card.toString() == this.props.card.toString();
      return (
          <div className="PlayingCard" onClick={this.props.card.show && this.handleClick.bind(this)} style={style}>
              <img style={{width:"100%"}} src={this.props.card.display()} />
              {selected && this.renderOverlay('aquamarine')}
          </div>
      );
  }
}
