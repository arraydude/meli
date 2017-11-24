import { reducer } from '../reducers';
import config from '../config';

const initialStateBase = {
    listing: [],
    categories: [],
    isFetching: false
};

export const urls = {
    getItems: '/api/items',
    getItem: id => `/api/items/${id}`
};

const transformItems = (state, action) => {
    const transformed = Object.assign({}, action, {
        data: {
            listing: action.data.items.slice(0, config.numberOfItems),
            categories: action.data.categories
        }
    });

    return reducer(state, transformed);
};

const transformItem = (state, action) => {
    const itemIndex = state.listing.findIndex(item => item.id === action.data.id);

    if(itemIndex<0) {
        state.listing.push(action.data);
    } else {
        state.listing[ itemIndex ].description = action.data.description;
    }

    action.data = {};

    return reducer(state, action);
};

export default (state = initialStateBase, action) => {
    switch (action.type) {
        case 'RECEIVE_ITEMS':
            return transformItems(state, action);
        case 'RECEIVE_ITEM':
            return transformItem(state, action);
        default:
            return reducer(state, action);
    }
};