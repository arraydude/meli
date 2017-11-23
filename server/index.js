import express from 'express';
import config from './config';
import morgan from 'morgan';
import apicache from 'apicache';
import requests from './requests';

const { middleware: cache } = apicache;
const app = express();

app.use(morgan(config.morgan));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/api/items', cache('5 minutes'), requests.getItems);

app.get('/api/items/:id', cache('30 minutes'), requests.getItem);

app.listen(config.port, () => {
    console.log(`[ API-PROXY ] Running on ${config.port}`);
});