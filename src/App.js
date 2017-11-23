import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/header';
import Spinner from './components/spinner/spinner';
import { Listing, About } from './containers';

class App extends Component {
    static PropTypes = {
        config: PropTypes.object.isRequired,
        isFetching: PropTypes.bool
    };

    static defaultProps = {
        isFetching: false
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
                { this.props.isFetching && <Spinner/> }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.items.isFetching
    }
};

export default connect(mapStateToProps, null)(App);
