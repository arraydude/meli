import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import Header from './components/header';
import { Listing, About } from './containers';

class App extends Component {
    static PropTypes = {
        config: PropTypes.object.isRequired
    };

    static childContextTypes = {
        config: PropTypes.object
    };

    getChildContext() {
        return {
           config: this.props.config
        };
    }

    render() {
        return (
            <div className="App">
                <Helmet>
                    <title>{ this.props.config.title }</title>
                </Helmet>
                <Header/>
                <main className="container">
                    <Route exact path="/" component={ Listing } />
                    <Route exact path="/about" component={ About } />
                </main>
            </div>
        );
    }
}

export default App;
