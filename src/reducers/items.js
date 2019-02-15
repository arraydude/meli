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
    const listing = items.slice(0, config.numberOfItems).map(item => item.id);
    const transformed = {
        ...action,
        data: {
            listing,
            elements: [...state.elements, ...items],
            categories
        }
    };

    return reducer(state, transformed);
};

const transformItem = (state, action) => {
    const newState = { ...state };
    const itemIndex = state.elements.findIndex(item => item.id === action.data.id);

    if(itemIndex<0) {
        newState.elements = [ ...newState.elements, action.data ];
    } else {
        newState.elements[ itemIndex ].description = action.data.description;
    }

    return reducer(state, { ...action, data: {} });
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