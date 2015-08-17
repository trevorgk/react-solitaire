import React, { PropTypes } from 'react';
import Pile from './Pile';

export default class Tableau extends React.Component{
    render() {
        let piles = this.props.piles.map(function(pile) {
            return <Pile pile={pile} layout={Layout.FannedDown}/>
        });
        return (
            <div className="Tableau" style={{padding:"130px 10px 120px", float: "right"}}>
                {piles}
            </div>
        );
    }
}
