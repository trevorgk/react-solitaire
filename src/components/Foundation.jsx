import React, {
  PropTypes
} from 'react';
import Pile from './Pile';

export default class Foundation extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.notifySelected(this.props.column);
  };
  render() {
    return (
      <div className="Foundation" onClick={this.handleClick.bind(this)} style={{
        float: "left"
      }}>
        <div style={{
          width: "80px",
          height: "112px",
          border: "1px solid #CCC",
          borderRadius: "5px",
          margin: "10px 5px"
        }}>
          {(() => {
            if (this.props.pile.length > 0) {
              return <Pile layout={Layout.Squared} pile={this.props.pile} selectedCard={this.props.selectedCard}/>
            }
          })()}
        </div>
      </div>
    );}

  }
