var React = require("react");
var PlayingCards = require('../../models/playing-cards');
var PileTypes = require('../../constants/PileTypes');
class KlondikeCard extends React.Component {
    constructor(props) {
        super(props);
        this.clickTimeoutId = null;
        this.handleClick = this.handleClick.bind(this);
    }
    static canSelect(target) {
        switch (target.pileType) {
            case PileTypes.WASTE:
                return target.pos == target.pileSize - 1;
        }
        return true;
    }
    static canMove(src, dest) {
        switch (dest.pileType) {
            case PileTypes.TABLEAUPILE:
                return dest.pos == dest.pileSize - 1 && src.card.getColor() != dest.card.getColor() && src.card.rank == dest.card.rank - 1;
            case PileTypes.EMPTYTABLEAU:
                return src.card.rank == PlayingCards.Rank.King;
            case PileTypes.FOUNDATION:
                if (src.pileType == PileTypes.TABLEAUPILE && src.pos != src.pileSize - 1)
                    return false;
                return src.card.suit == dest.row && ((src.card.rank == PlayingCards.Rank.Ace) || (dest.card && src.card.rank == dest.card.rank + 1));
            default:
                return false;
        }
    }
    static renderOverlay(color) {
        return (React.createElement("div", {style: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: color,
        }}));
    }
    handleClick() {
        let delay = 225;
        let payload = { pileType: this.props.pileType, row: this.props.row, card: this.props.card, pos: this.props.pos, pileSize: this.props.pileSize };
        if (!this.clickTimeoutId) {
            this.clickTimeoutId = setTimeout(() => {
                this.props.clickHandler(payload);
                this.clickTimeoutId = null;
            }, delay);
        }
        else {
            this.clickTimeoutId = clearTimeout(this.clickTimeoutId);
            this.props.doubleClickHandler(payload);
        }
    }
    render() {
        let style = Object.assign(this.props.style, { position: "relative", width: "80px", height: "112px" });
        let selected = this.props.selected != null && this.props.selected.card.toString() == this.props.card.toString();
        let validDropTarget = !selected && this.props.card.show && this.props.selected != null && KlondikeCard.canMove(this.props.selected, { pileType: this.props.pileType, card: this.props.card, row: this.props.row, pos: this.props.pos, pileSize: this.props.pileSize });
        return (React.createElement("div", {className: "KlondikeCard", onClick: this.props.card.show && this.handleClick.bind(this), style: style}, React.createElement("img", {style: { width: "100%" }, src: this.props.card.display()}), selected && KlondikeCard.renderOverlay('aquamarine')));
    }
}
exports.KlondikeCard = KlondikeCard;
