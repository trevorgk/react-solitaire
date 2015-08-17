import React, { PropTypes } from 'react';

export default class PlayingCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isSelected: false};
  }

  renderOverlay(color) {
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
      }} />
    );
  }

  handleClick(event) {
      this.setState({isSelected:!this.state.isSelected});
      console.log('isSelected',this.state.isSelected);
      this.props.notifySelected(this.props.card);
  };

  render() {
      let style = React.addons.update({position: "relative", width:"80px",height:"112px"}, {$merge: this.props.style});
      let card = this.props.card;
      return (
          <div className="PlayingCard" onClick={this.handleClick.bind(this)} style={style}>
              <img style={{width:"100%"}} src={card.display()} />
              {this.state.isSelected && this.renderOverlay('aquamarine')}
          </div>
      );
  }
}
