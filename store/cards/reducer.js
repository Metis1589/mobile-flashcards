import * as actionTypes from './actionTypes';

const initialState = {
    list:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CARDS:
            return {
                ...state,
                ['list'] : action.payload,
            }
        case actionTypes.FETCH_CARD:
            return {
                ...state,
                [action.card.id]: action.card,
            }
        case actionTypes.CREATE_CARD:
            let updatedState = state.list;
            updatedState.push(action.card);
            return {
                ...state,
                ['list'] : updatedState
            }
        case actionTypes.UPDATE_CARD:
            return {
                ...state,
                ['list'] : state.list.map(card =>
                    (card.id === action.card.id)
                        ? action.card
                        : card)
            }
        case actionTypes.DELETE_CARD:
            return {
                ...state,
                ['list'] : state.list.filter((card) => {
                    return card.id !== action.card_id
                })
            }
        default:
            return state;
    }
};

