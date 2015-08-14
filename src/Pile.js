import React, { PropTypes } from 'react';
import PlayingCard from './PlayingCard';

export default class Pile{

    render() {
        let pileStyle = this.props.pileStyle || {};
        let cardStyle = this.props.cardStyle || {};

        switch(this.props.layout){
            case Layout.Squared:
                pileStyle = React.addons.update({position: "relative", width: "80px", height: "112px"}, {$merge: pileStyle});
                cardStyle = React.addons.update({position: "absolute"}, {$merge: cardStyle});
                break;
            case Layout.FannedRight:
                pileStyle = React.addons.update({
                    //clear:"both",
                    margin:"0 5px"}, {$merge: pileStyle});
                cardStyle = React.addons.update({float:"left", marginLeft:"-65px"}, {$merge: cardStyle});
                break;
            case Layout.FannedDown:
            default:
                pileStyle = React.addons.update({float:"left", margin:"0 5px"}, {$merge: pileStyle});
                cardStyle = React.addons.update({marginTop:"-95px"}, {$merge: cardStyle});
                break;
        }
        let cards = this.props.pile.map(function(card){
            return <PlayingCard card={card} style={cardStyle} />
        });
        return (
            <div className="Pile" style={pileStyle}>
        {cards}
            </div>
        );
    }
}
