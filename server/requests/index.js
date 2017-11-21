import fetchPonyfillModule from 'fetch-ponyfill';
import config from '../config';
import getItem from './getItem';
import getItems from './getItems';

const { fetch } = fetchPonyfillModule();

const commonOptions = {
    timeout: config.api.timeout,
    compress: config.api.compress
};

export const get = endpoint => {
    const url = `${config.api.url}${endpoint}`;
    const options = Object.assign({}, commonOptions, {
        method: 'get'
    });

    return fetch(url, options).then(res => res.json());
};

export default {
    getItem,
    getItems
};
