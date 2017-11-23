import fetchPonyfillModule from 'fetch-ponyfill';
import config from './config';
import urlHelper from './helpers/url';
import { requested, received, receivedWithError } from './actions';

const { fetch } = fetchPonyfillModule();

export const request = (url, method, params = {}, headers = {}, type) => {
    if (url === '') {
        return () => {};
    }

    const strParams = urlHelper.paramsToQueryString(params);
    const init = { method };

    init.headers = headers;

    return dispatch => {
        const requestUrl = `${config.api}${url}?${strParams}`;

        dispatch(requested(type));

        return fetch(requestUrl, init)
            .then(response => {
                return response.json();
            })
            .then(json => {
                dispatch(received(type, requestUrl, method, strParams, json));

                return {
                    ok: true,
                    data: json
                };
            })
            .catch(e => {
                const json = {
                    ok: false,
                    data: {
                        message: e.message
                    }
                };

                dispatch(receivedWithError(type, requestUrl, method, strParams, json));
                console.error(e, requestUrl, type); // eslint-disable-line

                return json;
            });
    };
};

export const get = (url, type, params = {}, headers = {}) => request(url, 'GET', params, headers, type);
