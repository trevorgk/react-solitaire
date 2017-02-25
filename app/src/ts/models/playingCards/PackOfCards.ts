import { PackConfig, Suit, JokerCard, PlayingCard } from './';
import { extend } from 'lodash/fp';
import { findIndex } from 'lodash/array';

export class PackOfCards {
    public cards: PlayingCard[] = [];
    config: PackConfig;
    size: number;
    suits: Array<Suit>

    constructor(config: PackConfig = {}) {
        const defaultConfig: PackConfig = {
            numberOfDecks: 1,
            numberOfJokers: 0,
            suitOrder: ['Spades', 'Clubs', 'Diamonds', 'Hearts'],
            rankOrder: ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace']
        }
        this.config = extend({}, defaultConfig, config);

        for (let suit of this.config.suitOrder) {
            for (let rank of this.config.rankOrder) {
                for (let i = 0; i < this.config.numberOfDecks; i++) {
                    this.cards.push(new PlayingCard(rank, suit));
                }
            }
        }

        for (let i = 0; i < this.config.numberOfJokers; i++) {
            this.cards.push(new JokerCard())
        }

        this.size = this.cards.length;
        this.suits = this.config.suitOrder;
        this.shuffle();
    }


    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let swap = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = swap;
        }
    }


    deal(players: number, handSize = 0) {
        const maxPlayers = 4;
        if (players < 1 || players > 4) {
            throw new Error('Number of players must be between one and four.');
        }
        if (handSize && players * handSize > this.cards.length) {
            throw new Error('Not enough cards in pack for each player');
        }
        if (!handSize)
            handSize = Math.floor(this.cards.length / players);
        let hands: PlayingCard[][] = [];
        for (let i = 0; i < players; i++) {
            hands[i] = new Array<PlayingCard>();
        }
        for (let i = 0; i < handSize; i++) {
            for (let j = 0; j < players; j++) {
                hands[j][i] = this.cards.pop();
            }
        }
        return hands;
    }

    //  consider using _.deepClone for moveCard and swapCard if mutability becomes a concern later
    static moveCard = (cards: PlayingCard[], indexFrom: number, indexTo: number) => {
        if (indexFrom < 0 || indexTo < 0) {
            throw Error('index less than zero')
        }
        if (indexFrom >= cards.length || indexTo >= cards.length) {
            throw Error('index greater than array length')
        }
        if (indexFrom === indexTo) return cards;

        const card = cards[indexFrom];
        cards.splice(indexFrom, 1);
        if (indexTo > indexFrom) {
            indexTo = indexTo - 1;
        }
        cards.splice(indexTo, 0, card);

        return cards;
    }

    static swapCards = (cards: PlayingCard[], indexLeft: number, indexRight: number) => {
        const swap = cards[indexLeft];
        cards[indexLeft] = cards[indexRight];
        cards[indexRight] = swap;
        return cards;
    }

    //  Based on .NET StrComp.
    //  Returns -1, 0, or 1, based on the result of comparison.
    public compareCards = (cardA: PlayingCard, cardB: PlayingCard) => {
        if (cardA.toString() === 'Joker' && cardB.toString() === 'Joker') return 0;
        if (cardA.toString() === 'Joker') return -1;
        if (cardB.toString() === 'Joker') return 1;

        const rankA = findIndex(this.config.rankOrder, val => val === cardA.rank);
        const rankB = findIndex(this.config.rankOrder, val => val === cardB.rank);

        if (rankA > rankB) return -1;
        if (rankA < rankB) return 1;

        const suitA = findIndex(this.config.suitOrder, val => val === cardA.suit);
        const suitB = findIndex(this.config.suitOrder, val => val === cardA.suit);

        if (suitA > suitB) return -1;
        if (suitA < suitB) return 1;

        return 0;
    }
}