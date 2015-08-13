"use strict";


var PlayingCard = React.createClass({
  render: function() {
    return (
      <div className="PlayingCard" style={this.props.style}>
        <img style={{width:"80px"}} src={this.props.card.display()} />
      </div>
    );
  }
});

var Pile = React.createClass({
  render: function() {
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
});

var Foundation = React.createClass({
  render: function() {
    return (
      <div className="Foundation" style={{
        width: "80px",
        height: "112px",
        border: "1px solid #CCC",
        borderRadius: "5px",
        float: "right",
        margin: "10px 5px"
      }}>
      </div>
    );
  }
});

var Tableau = React.createClass({
  render: function() {
    var piles = this.props.piles.map(function(pile) {
      return <Pile pile={pile} layout={Layout.FannedDown}/>
    });
    return (
      <div className="Tableau" style={{padding:"130px 10px 120px", float: "right"}}>
        {piles}
      </div>
    );
  }
});

var Stock = React.createClass({
  getInitialState: function() {
   return {waste: []};
 },

  handleClick: function(event) {
    const wasteSize = 3;
    let cards = this.props.cards.concat(this.state.waste.reverse());
    let waste = [];
    for (let i = 0; i < wasteSize; i++){
      let card = cards.getNextCard();
      card.show = i == wasteSize - 1;
      waste.push(card);
    }
    this.setState({waste: waste});
    console.log('cards in deck', this.props.cards.toString());
  },

  render: function() {
    return (
      <div className="Stock" style={{
        width: "240px",
        margin: "10px 15px",
        float: "left"
      }}>
        <img src={Card.backFace} onClick={this.handleClick} style={{
          width: "80px",
          height: "112px",
          cursor: "pointer",
          float:"left"
        }}/>
        <Pile pile={this.state.waste} layout={Layout.FannedRight} pileStyle={{
          float:"left",
          marginLeft:"75px"}} />
      </div>
    );
  }
});

var Solitaire = React.createClass({
  render: function() {
    const pileCount = this.props.pileCount;
    let deck = new DeckOfCards(false);
    deck.shuffle();
    let piles = [];
    for (let i = 0; i < pileCount; i++) {
      for (let j = pileCount - 1; j >= i; j--) {
        if (!piles[j]) {
          piles[j] = [];
        }
        let card = deck.getNextCard();
        card.show = j == i;

        piles[j].push(card);
      }
    }
    let style = {
      backgroundImage: "url(img/card-table-bg.png)",
      width:"650px",
      margin: "0 auto"
    };
    return (
      <div className="Solitaire" style={style}>
        <div className="">
          <div className="">
            <Stock cards={deck}/>
          </div>
          <div style={{paddingRight:"10px", float: "right"}}>
            <Foundation suit={Suit.Spades} />
            <Foundation suit={Suit.Clubs} />
            <Foundation suit={Suit.Diamonds} />
            <Foundation suit={Suit.Hearts} />
          </div>
        </div>
        <div>
          <Tableau piles={piles}/>
        </div>
        <br style={{clear: "both"}}/>
        <div className="diagnostics">
          <p>Cards in stock:{deck.length()}</p>
        </div>
      </div>
    );
  }
});

React.render(<Solitaire pileCount={7}/>, document.getElementById('solitaire'));
