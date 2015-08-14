define(["require", "exports", './DeckOfCards', './Player'], function (require, exports, DeckOfCards, Player) {
    var GameOfCards = (function () {
        function GameOfCards(players, handSize) {
            if (handSize === void 0) { handSize = 0; }
            this.deck = new DeckOfCards(false);
            //this.players = new Array<Player>();
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
    exports.GameOfCards = GameOfCards;
});
//# sourceMappingURL=GameOfCards.js.map