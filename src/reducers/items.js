import { initialStateBase, reducer } from '../reducers';

export const urls = {
    getItems: '/api/items',
    getItem: id => `/api/items/${id}`
};

export default (state = initialStateBase, action) => {
    switch (action.type) {
        case 'RECEIVE_ITEMS':
            return reducer(state, action, 'ITEMS');
        case 'RECEIVE_ITEM':
            return reducer(state, action, 'ITEMS');
        default:
            return reducer(state, action, 'ITEMS');
    }
};