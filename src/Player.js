define(["require", "exports"], function (require, exports) {
    var Player = (function () {
        function Player(hand, name) {
            if (name === void 0) { name = 'anon'; }
            this.hand = hand;
            this.name = name;
        }
        Player.prototype.toString = function () {
            return "Player '" + this.name + "' : {" + this.hand.join(", ") + "}";
        };
        return Player;
    })();
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map