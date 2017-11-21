import express from 'express';
import fetchPonyfillModule from 'fetch-ponyfill';
import config from './config/index';
import adapter from './adapter';
import morgan from 'morgan';
import apicache from 'apicache';

const { fetch } = fetchPonyfillModule();
const { middleware: cache } = apicache;
const app = express();

app.use(morgan(config.morgan));

const commonOptions = {
    timeout: config.api.timeout,
    compress: config.api.compress
};

const get = endpoint => {
    const url = `${config.api.url}${endpoint}`;
    const options = Object.assign({}, commonOptions, {
        method: 'get'
    });

    return fetch(url, options).then(res => res.json());
};

app.get('/api/items', cache('5 minutes'), (req, res) => {
    const request = get(`/sites/MLA/search?q=${req.query.q}`);

    request.then(response => {
        const { author } = config.api;
        const categories = [];
        const items = [];

        if (response.results) {
            response.results.forEach(item => {
                const itemAdapted = adapter(item);
                const { category, ...itemToBeAdded } = itemAdapted;

                categories.push(category);
                items.push(itemToBeAdded);
            });

            return {
                author,
                categories,
                items
            }
        }

        return response;
    }).then(json => res.send(JSON.stringify(json)));
});

app.get('/api/items/:id', cache('30 minutes'), (req, res) => {
    const { id } = req.params;
    const itemApiURL = `/items/${id}`;
    const promises = [
        get(itemApiURL),
        get(`${itemApiURL}/description`)
    ];

    Promise.all(promises)
        .then(response => {
            const item = response[ 0 ];
            const description = response[ 1 ];
            const json = Object.assign({}, adapter(item), {
                description: description && description.plain_text
            });

            res.send(JSON.stringify(json));
        });
});

app.listen(config.port, () => {
    console.log(`[ API-PROXY ] Running on ${config.port}`);
});