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
        pileStyle = React.addons.update(pileStyle, {$merge: {position: "relative", width: "80px", height: "112px"}});
        cardStyle = React.addons.update(cardStyle, {$merge: {position: "absolute"}});
        break;
      case Layout.FannedRight:
        pileStyle = React.addons.update(pileStyle, {$merge: {clear:"both", margin:"0 5px"}});
        cardStyle = React.addons.update(cardStyle, {$merge: {float:"left", marginLeft:"-65px"}});
        break;
      case Layout.FannedDown:
      default:
        pileStyle = React.addons.update(pileStyle, {$merge: {float:"left", margin:"0 5px"}});
        cardStyle = React.addons.update(cardStyle, {$merge: {marginTop:"-90px"}});
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

var Waste = React.createClass({
  render: function() {
    return (
      <div className="Waste">

      </div>
    );
  }
});

var Stock = React.createClass({
  render: function() {
    return (
      <div className="Stock">
        <img src={Card.backFace} style={{
          float: "left",
          width: "80px",
          height: "112px",
          margin: "10px 15px"
        }}/>
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
            <Stock cards={this.deck}/>
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
        <p>Cards in waste:{deck.length()}</p>
      </div>
    );
  }
});

React.render(<Solitaire pileCount={7}/>, document.getElementById('solitaire'));
