import * as actionTypes from './actionTypes'

export function fetchCards(cards) {
    return {type: actionTypes.FETCH_CARDS, cards}
}

export function fetchCard(card) {
    return {type: actionTypes.FETCH_CARD, card}
}

export function createCard(card) {
    return {type: actionTypes.CREATE_CARD, card}
}

export function updateCard(card) {
    return {type: actionTypes.UPDATE_CARD, card}
}

export function deleteCard(card_id) {
    return {type: actionTypes.DELETE_CARD, card_id}
}