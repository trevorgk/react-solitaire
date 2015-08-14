define(["require", "exports"], function (require, exports) {
    /// <reference path="Constants.ts"/>
    //
    var Card = (function () {
        function Card(suit, rank) {
            this.show = true;
            this.suit = suit;
            this.rank = rank;
            this.joker = false;
        }
        Card.prototype.getImageFile = function () {
            let filename = cardsDir + Suit[this.suit] + '/' + Rank[this.rank] + '.png';
            return filename.toLowerCase();
            //return 'img/cards/${this.suit}/${this.rank}';	wtb string interpolation
        };
        Card.prototype.display = function () {
            if (!this.show) {
                return cardsDir + 'back-purple.png';
            }
            return this.getImageFile();
        };
        Card.prototype.toString = function () {
            return Rank[this.rank] + " of " + Suit[this.suit];
        };
        return Card;
    })();
    exports.Card = Card;
});
//# sourceMappingURL=Card.js.map