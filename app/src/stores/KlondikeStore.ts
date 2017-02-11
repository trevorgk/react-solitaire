import {PackOfCards} from '../models/playingCards';
import {observable} from 'mobx';

export class KlondikeStore {
  @observable cards: PackOfCards
  public static init() {
    const store = new KlondikeStore();
    store.cards = new PackOfCards();

    return store;
  }  
}