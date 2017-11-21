import express from 'express';
import config from './config/index';
import morgan from 'morgan';
import apicache from 'apicache';
import requests from './requests';

const { middleware: cache } = apicache;
const app = express();

app.use(morgan(config.morgan));

app.get('/api/items', cache('5 minutes'), requests.getItems);

app.get('/api/items/:id', cache('30 minutes'), requests.getItem);

app.listen(config.port, () => {
    console.log(`[ API-PROXY ] Running on ${config.port}`);
});