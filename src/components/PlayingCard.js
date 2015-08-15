import React, { PropTypes } from 'react';

export default class PlayingCard extends React.Component{
    render() {
        return (
            <div className="PlayingCard" style={this.props.style}>
                <img style={{width:"80px"}} src={this.props.card.display()} />
            </div>
        );
    }
}
