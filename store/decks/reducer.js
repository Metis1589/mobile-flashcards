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
        case actionTypes.CREATE_DECK:
            if(state['list'] === null){
                state['list'] = {}
            }
            state['list'][action.deck.title] = action.deck
            return {
                ...state,
                ['list'] : state['list']
            }
        case actionTypes.ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck,
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

