export declare enum Suit {
    Spades = 0,
    Clubs = 1,
    Diamonds = 2,
    Hearts = 3,
}
export declare enum Color {
    Red = 0,
    Black = 1,
}
export declare enum Rank {
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13,
}
export declare enum Layout {
    Squared = 0,
    FannedDown = 1,
    FannedRight = 2,
}
export declare class Card {
    joker: boolean;
    suit: Suit;
    rank: Rank;
    show: boolean;
    static backFace: string;
    static getPip(suit: string): string;
    constructor(suit: Suit, rank: Rank);
    getImageFile(): string;
    getColor(): Color;
    display(): string;
    toString(): string;
}
export declare class Joker extends Card {
    constructor();
    toString(): string;
    getImageFile(): string;
}
export declare class DeckOfCards {
    suits: Suit[];
    ranks: Rank[];
    cards: Card[];
    constructor(includeJokers?: boolean);
    shuffle(): void;
    getTopCard(): Card;
    getBottomCard(): Card;
    addTopCard(card: Card): void;
    addBottomCard(card: Card): void;
    getNextCards(n: number): Card[];
    toString(): string;
    length(): number;
    concat(cards: Card[]): DeckOfCards;
    deal(players: number, handSize?: number): Card[][];
}
export declare class Player {
    hand: Card[];
    name: string;
    constructor(hand: Card[], name?: string);
    toString(): string;
}
