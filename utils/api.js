import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY, initData } from './_decks';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(initData); // set initial starter example data if no data set
}

export function submitDeck(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }));
}

export function submitCard(deck, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data);
      decks[deck] = {
        title: deck,
        questions: decks[deck].questions.concat(card)
      };
      AsyncStorage.setItem(DECKS_STORAGE_KEY, decks);
    });
}
