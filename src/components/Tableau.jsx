import React, { PropTypes } from 'react';
import Pile from './Pile';

export default class Tableau extends React.Component{
    constructor(props) {
      super(props);
    }

    render() {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selectedCard} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });

        let column = 0;
        return (
            <div className="Tableau"style={{padding:"130px 10px 120px", float: "right"}}>
                {this.props.piles.map(function(pile) {
                    return <Pile selectedCard={this.props.selectedCard} column={column++} notifySelected={this.props.notifySelected} pile={pile} layout={Layout.FannedDown}/>
                }.bind(this))}
            </div>
        );
    }
}
