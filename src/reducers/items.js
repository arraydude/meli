import { reducer } from '../reducers';
import config from '../config';

const initialStateBase = {
    elements: [],
    listing: [],
    categories: [],
    isFetching: false
};

export const urls = {
    getItems: '/api/items',
    getItem: id => `/api/items/${id}`
};

const transformItems = (state, action) => {
    const { items, categories } = action.data;
    const listing = action.data.items.slice(0, config.numberOfItems).map(item => item.id);
    const transformed = Object.assign({}, action, {
        data: {
            listing,
            elements: [...state.elements, ...items],
            categories
        }
    });

    return reducer(state, transformed);
};

const transformItem = (state, action) => {
    const itemIndex = state.elements.findIndex(item => item.id === action.data.id);

    if(itemIndex<0) {
        state.elements.push(action.data);
    } else {
        state.elements[ itemIndex ].description = action.data.description;
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