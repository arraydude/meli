import { reducer } from '../reducers';

const initialStateBase = {
    listing: {},
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
            listing: action.data.items,
            categories: action.data.categories
        }
    });

    return reducer(state, transformed);
};

export default (state = initialStateBase, action) => {
    switch (action.type) {
        case 'RECEIVE_ITEMS':
            return transformItems(state, action);
        case 'RECEIVE_ITEM':
            return reducer(state, action);
        default:
            return reducer(state, action);
    }
};