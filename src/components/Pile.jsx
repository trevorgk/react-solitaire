import React, { PropTypes } from 'react/addons';
import PlayingCard from './PlayingCard';

export default class Pile extends React.Component{
    constructor(props) {
      super(props);
      this.notifySelected = this.notifySelected.bind(this);
    }

    notifySelected(card, row) {
      if (this.props.notifySelected)
        this.props.notifySelected(card, row, this.props.column);
    }

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
        // let cards = this.props.pile.map(function(card){
        //     return <PlayingCard card={card} style={React.addons.update({zIndex:zIndex++}, {$merge: cardStyle})} />
        // });

        return (
            <div className="Pile" style={pileStyle}>
              {this.props.pile.map((card, row) =>
                  <PlayingCard card={card} selectedCard={this.props.selectedCard} notifySelected={this.notifySelected} row={row} style={React.addons.update({zIndex:row}, {$merge: cardStyle})} />
              )}
            </div>
        );
    }
}
