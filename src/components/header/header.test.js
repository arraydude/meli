import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './index';

describe('Header Component', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><Header/></BrowserRouter>, div);
    });
});
