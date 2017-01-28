import {Rank, Suit} from './';

export interface PackConfig {
    numberOfDecks?:number,
    numberOfJokers?:number,
    suitOrder?:Suit[],
    rankOrder?:Rank[]
}