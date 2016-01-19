import * as PlayingCards from './models/PlayingCards';
export interface ClickTarget {
    pileType: string;
    card?: PlayingCards.Card;
    row?: number;
    pos?: number;
    pileSize?: number;
}
export interface MoveHistory {
    moveType: string;
    src?: ClickTarget;
    dest?: ClickTarget;
    reveal?: boolean;
    wasteSize?: number;
}
