import { combineReducers } from 'redux';
import items from './items';

export const reducer = (state, action) => {
    let newState;

    switch (action.type) {
        case 'REQUEST_ITEM':
        case 'REQUEST_ITEMS': {
            newState = Object.assign({}, state, {
                    isFetching: true
                });
            break;
        }
        case 'RECEIVE_ITEM':
        case 'RECEIVE_ITEMS': {
            newState = Object.assign({}, state, action.data, {
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
