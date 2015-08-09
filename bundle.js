"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Suit;
(function (Suit) {
    Suit[Suit["Spades"] = 0] = "Spades";
    Suit[Suit["Clubs"] = 1] = "Clubs";
    Suit[Suit["Diamonds"] = 2] = "Diamonds";
    Suit[Suit["Hearts"] = 3] = "Hearts";
})(Suit || (Suit = {}));
var Rank;
(function (Rank) {
    Rank[Rank["Ace"] = 1] = "Ace";
    Rank[Rank["Two"] = 2] = "Two";
    Rank[Rank["Three"] = 3] = "Three";
    Rank[Rank["Four"] = 4] = "Four";
    Rank[Rank["Five"] = 5] = "Five";
    Rank[Rank["Six"] = 6] = "Six";
    Rank[Rank["Seven"] = 7] = "Seven";
    Rank[Rank["Eight"] = 8] = "Eight";
    Rank[Rank["Nine"] = 9] = "Nine";
    Rank[Rank["Ten"] = 10] = "Ten";
    Rank[Rank["Jack"] = 11] = "Jack";
    Rank[Rank["Queen"] = 12] = "Queen";
    Rank[Rank["King"] = 13] = "King";
})(Rank || (Rank = {}));
var Layout;
(function (Layout) {
    Layout[Layout["Squared"] = 0] = "Squared";
    Layout[Layout["FannedDown"] = 1] = "FannedDown";
    Layout[Layout["FannedRight"] = 2] = "FannedRight";
})(Layout || (Layout = {}));
var cardsDir = 'img/cards/';
var Card = (function () {
    function Card(suit, rank) {
        this.show = true;
        this.suit = suit;
        this.rank = rank;
        this.joker = false;
    }
    Card.prototype.getImageFile = function () {
        var filename = cardsDir + Suit[this.suit] + '/' + Rank[this.rank] + '.png';
        return filename.toLowerCase();
    };
    Card.prototype.display = function () {
        if (!this.show) {
            return Card.backFace;
        }
        return this.getImageFile();
    };
    Card.prototype.toString = function () {
        return Rank[this.rank] + " of " + Suit[this.suit];
    };
    Card.backFace = cardsDir + 'back-purple.png';
    return Card;
})();
var Joker = (function (_super) {
    __extends(Joker, _super);
    function Joker() {
        _super.call(this, null, null);
        this.joker = true;
    }
    Joker.prototype.toString = function () {
        return "Joker";
    };
    Joker.prototype.getImageFile = function () {
        return cardsDir + 'joker1.png';
    };
    return Joker;
})(Card);
var DeckOfCards = (function () {
    function DeckOfCards(includeJokers) {
        var _this = this;
        if (includeJokers === void 0) {
            includeJokers = true;
        }
        this.suits = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
        this.ranks = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
        this.cards = [];
        this.suits.forEach(function (suit) {
            return _this.ranks.forEach(function (rank) {
                return _this.cards.push(new Card(suit, rank));
            });
        });
        if (includeJokers) {
            this.cards.push(new Joker());
            this.cards.push(new Joker());
        }
    }
    DeckOfCards.prototype.shuffle = function () {
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var swap = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = swap;
        }
    };
    DeckOfCards.prototype.getNextCard = function () {
        return this.cards.pop();
    };
    DeckOfCards.prototype.toString = function () {
        return this.cards.join(", ");
    };
    DeckOfCards.prototype.deal = function (players, handSize) {
        if (handSize === void 0) {
            handSize = 0;
        }
        var maxPlayers = 4;
        if (players < 1 || players > 4) {
            throw new Error("Number of players must be between one and four.");
        }
        if (handSize && players * handSize > this.cards.length) {
            throw new Error("Not enough cards in pack for each player");
        }
        if (!handSize) handSize = Math.floor(this.cards.length / players);
        var hands = [];
        for (var i = 0; i < players; i++) {
            hands[i] = new Array();
        }
        for (var i = 0; i < handSize; i++) {
            for (var j = 0; j < players; j++) {
                hands[j][i] = this.cards.pop();
            }
        }
        return hands;
    };
    return DeckOfCards;
})();
var Player = (function () {
    function Player(hand, name) {
        if (name === void 0) {
            name = 'anon';
        }
        this.hand = hand;
        this.name = name;
    }
    Player.prototype.toString = function () {
        return "Player '" + this.name + "' : {" + this.hand.join(", ") + "}";
    };
    return Player;
})();
var GameOfCards = (function () {
    function GameOfCards(players, handSize) {
        if (handSize === void 0) {
            handSize = 0;
        }
        this.deck = new DeckOfCards(false);
        var hands = this.deck.deal(players, handSize);
        this.players = hands.map(function (hand) {
            return new Player(hand);
        });
    }
    GameOfCards.prototype.toString = function () {
        return this.players.join("\n") + "\nPack : {" + this.deck + "}";
    };
    return GameOfCards;
})();
"use strict";

var PlayingCard = React.createClass({
  displayName: "PlayingCard",

  render: function render() {
    return React.createElement(
      "div",
      { className: "PlayingCard", style: this.props.style },
      React.createElement("img", { style: { width: "80px" }, src: this.props.card.display() })
    );
  }
});

var Pile = React.createClass({
  displayName: "Pile",

  render: function render() {
    var pileStyle = this.props.pileStyle || {};
    var cardStyle = this.props.cardStyle || {};

    switch (this.props.layout) {
      case Layout.Squared:
        pileStyle = React.addons.update(pileStyle, { $merge: { position: "relative", width: "80px", height: "112px" } });
        cardStyle = React.addons.update(cardStyle, { $merge: { position: "absolute" } });
        break;
      case Layout.FannedRight:
        pileStyle = React.addons.update(pileStyle, { $merge: { clear: "both", margin: "0 5px" } });
        cardStyle = React.addons.update(cardStyle, { $merge: { float: "left", marginLeft: "-65px" } });
        break;
      case Layout.FannedDown:
      default:
        pileStyle = React.addons.update(pileStyle, { $merge: { float: "left", margin: "0 5px" } });
        cardStyle = React.addons.update(cardStyle, { $merge: { marginTop: "-90px" } });
        break;
    }
    var cards = this.props.pile.map(function (card) {
      return React.createElement(PlayingCard, { card: card, style: cardStyle });
    });
    return React.createElement(
      "div",
      { className: "Pile", style: pileStyle },
      cards
    );
  }
});

var Foundation = React.createClass({
  displayName: "Foundation",

  render: function render() {
    return React.createElement("div", { className: "Foundation", style: {
        width: "80px",
        height: "112px",
        border: "1px solid #CCC",
        borderRadius: "5px",
        float: "right",
        margin: "10px 5px"
      } });
  }
});

var Tableau = React.createClass({
  displayName: "Tableau",

  render: function render() {
    var piles = this.props.piles.map(function (pile) {
      return React.createElement(Pile, { pile: pile, layout: Layout.FannedDown });
    });
    return React.createElement(
      "div",
      { className: "Tableau", style: { padding: "130px 10px 120px", float: "right" } },
      piles
    );
  }
});

var Waste = React.createClass({
  displayName: "Waste",

  render: function render() {
    return React.createElement("div", { className: "Waste" });
  }
});

var Stock = React.createClass({
  displayName: "Stock",

  render: function render() {
    return React.createElement(
      "div",
      { className: "Stock" },
      React.createElement("img", { src: Card.backFace, style: {
          float: "left",
          width: "80px",
          height: "112px",
          margin: "10px 15px"
        } })
    );
  }
});

var Solitaire = React.createClass({
  displayName: "Solitaire",

  render: function render() {
    var pileCount = this.props.pileCount;
    var deck = new DeckOfCards(false);
    deck.shuffle();
    var piles = [];
    for (var i = 0; i < pileCount; i++) {
      for (var j = pileCount - 1; j >= i; j--) {
        if (!piles[j]) {
          piles[j] = [];
        }
        var card = deck.getNextCard();
        card.show = j == i;

        piles[j].push(card);
      }
    }
    var style = {
      backgroundImage: "url(img/card-table-bg.png)",
      width: "650px",
      margin: "0 auto"
    };
    return React.createElement(
      "div",
      { className: "Solitaire", style: style },
      React.createElement(
        "div",
        { className: "" },
        React.createElement(
          "div",
          { className: "" },
          React.createElement(Stock, { cards: this.deck })
        ),
        React.createElement(
          "div",
          { style: { paddingRight: "10px", float: "right" } },
          React.createElement(Foundation, { suit: Suit.Spades }),
          React.createElement(Foundation, { suit: Suit.Clubs }),
          React.createElement(Foundation, { suit: Suit.Diamonds }),
          React.createElement(Foundation, { suit: Suit.Hearts })
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement(Tableau, { piles: piles })
      ),
      React.createElement("br", { style: { clear: "both" } })
    );
  }
});

React.render(React.createElement(Solitaire, { pileCount: 7 }), document.getElementById('solitaire'));
