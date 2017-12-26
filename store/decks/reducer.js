import * as actionTypes from './actionTypes';

const initialState = {
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DECKS:
            return {
                ...state,
                ['list'] : action.decks,
            }
        case actionTypes.FETCH_DECK:
            console.log('state', state);
            return {
                ...state,
                [action.deck.id]: action.deck,
            }
        case actionTypes.CREATE_DECK:
            console.log('state', state, action);
            return {
                ...state,
                [action.deck.title] : action.deck
            }
        case actionTypes.UPDATE_DECK:
            return {
                ...state,
                ['list'] : state.list.map(deck =>
                    (deck.id === action.deck.id)
                        ? action.deck
                        : deck)
            }
        case actionTypes.DELETE_DECK:
            return {
                ...state,
                ['list'] : state.list.filter((deck) => {
                    return deck.id !== action.deck_id
                })
            }
        default:
            return state;
    }
};

