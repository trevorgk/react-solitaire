define(["require", "exports", './Card'], function (require, exports, Card) {
    var DeckOfCards = (function () {
        //public length = this.cards.length;
        function DeckOfCards(includeJokers) {
            var _this = this;
            if (includeJokers === void 0) { includeJokers = true; }
            //	default order
            this.suits = [0 /* Spades */, 1 /* Clubs */, 2 /* Diamonds */, 3 /* Hearts */];
            this.ranks = [1 /* Ace */, 2 /* Two */, 3 /* Three */, 4 /* Four */, 5 /* Five */, 6 /* Six */, 7 /* Seven */, 8 /* Eight */, 9 /* Nine */, 10 /* Ten */, 11 /* Jack */, 12 /* Queen */, 13 /* King */];
            this.cards = [];
            this.suits.forEach(function (suit) { return _this.ranks.forEach(function (rank) { return _this.cards.push(new Card(suit, rank)); }); });
            if (includeJokers) {
                this.cards.push(new Joker());
                this.cards.push(new Joker());
            }
        }
        //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        DeckOfCards.prototype.shuffle = function () {
            for (let i = this.cards.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let swap = this.cards[i];
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
        DeckOfCards.prototype.length = function () {
            return this.cards.length;
        };
        DeckOfCards.prototype.push = function (card) {
            this.cards.push(card);
        };
        DeckOfCards.prototype.concat = function (cards) {
            this.cards = cards.concat(this.cards);
            return this;
        };
        DeckOfCards.prototype.deal = function (players, handSize) {
            if (handSize === void 0) { handSize = 0; }
            const maxPlayers = 4;
            if (players < 1 || players > 4) {
                throw new Error("Number of players must be between one and four.");
            }
            if (handSize && players * handSize > this.cards.length) {
                throw new Error("Not enough cards in pack for each player");
            }
            if (!handSize)
                handSize = Math.floor(this.cards.length / players);
            let hands = [];
            for (let i = 0; i < players; i++) {
                hands[i] = [];
            }
            for (let i = 0; i < handSize; i++) {
                for (let j = 0; j < players; j++) {
                    hands[j][i] = this.cards.pop();
                }
            }
            return hands;
        };
        return DeckOfCards;
    })();
    exports.DeckOfCards = DeckOfCards; /**
     * Created by lukas on 2015-08-15.
     */
});
//# sourceMappingURL=DeckOfCards.js.map