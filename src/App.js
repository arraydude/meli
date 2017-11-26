import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/header/header';
import Spinner from './components/spinner/spinner';

import Listing from './containers/listing/listing';
import Detail from './containers/detail/detail';
import NotFound from './containers/notFound/notFound';

import './index.css';

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
                    <Switch>
                        <Route exact path="/" component={ Listing } />
                        <Route path="/:id-:slug?" component={ Detail } />
                        <Route component={ NotFound } />
                    </Switch>
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

export default withRouter(connect(mapStateToProps, null)(App));
