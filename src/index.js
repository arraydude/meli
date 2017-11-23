import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import config from './config';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const target = document.querySelector('#root');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App config={ config } />
        </BrowserRouter>
    </Provider>,
    target
);

registerServiceWorker();
