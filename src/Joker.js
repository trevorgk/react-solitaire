var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
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
    exports.Joker = Joker;
});
//# sourceMappingURL=Joker.js.map