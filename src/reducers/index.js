import { combineReducers } from 'redux';
import items from './items';

export const initialStateBase = {
    items: {},
    isFetching: false
};

export const reducer = (state, action) => {
    let newState;

    switch (action.type) {
        case 'REQUEST_ITEMS': {
            newState = Object.assign({}, state, {
                    isFetching: true
                });
            break;
        }
        case 'RECEIVE_ITEMS': {
            newState = Object.assign({}, state, {
                items: action.data,
            }, {
                isFetching: false
            });
            break;
        }
        default: {
            newState = state;
        }
    }

    return newState;
};

export default combineReducers({
    items
});
