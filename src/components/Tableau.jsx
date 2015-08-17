import React, { PropTypes } from 'react';
import Pile from './Pile';

export default class Tableau extends React.Component{
    render() {
        // let piles = this.props.piles.map(function(pile) {
        //     return <Pile  selected={this.state.selectedCard} notify={notifySelected} pile={pile} layout={Layout.FannedDown}/>
        // });
        let notifySelected = this.props.notifySelected;
        let selectedCard = this.props.selectedCard;
        return (
            <div className="Tableau"style={{padding:"130px 10px 120px", float: "right"}}>
                {this.props.piles.map(function(pile) {
                    return <Pile selectedCard={selectedCard} notifySelected={notifySelected} pile={pile} layout={Layout.FannedDown}/>
                })}
            </div>
        );
    }
}
