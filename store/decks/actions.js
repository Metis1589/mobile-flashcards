import * as actionTypes from './actionTypes'

export function fetchDecks(decks) {
    return {type: actionTypes.FETCH_DECKS, decks}
}

export function fetchDeck(deck) {
    return {type: actionTypes.FETCH_DECK, deck}
}

export function createDeck(deck) {
    return {type: actionTypes.CREATE_DECK, deck}
}

export function updateDeck(deck) {
    return {type: actionTypes.UPDATE_DECK, deck}
}

export function deleteDeck(deck_id) {
    return {type: actionTypes.DELETE_DECK, deck_id}
}