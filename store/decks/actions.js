import * as actionTypes from './actionTypes'

export function fetchDecks(decks) {
    return {type: actionTypes.FETCH_DECKS, decks}
}

export function createDeck(deck) {
    return {type: actionTypes.CREATE_DECK, deck}
}

export function addCard(deck) {
    return { type: actionTypes.ADD_CARD_TO_DECK, deck}
}

export function deleteDeck(deck_id) {
    return {type: actionTypes.DELETE_DECK, deck_id}
}