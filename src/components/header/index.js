import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get } from '../../requests';
import { urls } from '../../reducers/items';

import { Navbar } from 'react-bootstrap';
import Search from '../search';

import logo from './assets/Logo_ML.png';
import './style.css';

class Header extends Component {
    static propTypes = {
        getItems: PropTypes.func
    };

    static defaultProps = {
        getItems: () => {}
    };

    constructor() {
        super();

        this.bindings = {
            onChangeSearch: this.onChangeSearch.bind(this)
        };
    }

    onChangeSearch(value) {
        this.props.getItems(value);
    }

    render() {
        return (
            <header className="navbar navbar-expand-lg header">
                <Navbar.Brand>
                    <Link to="/">
                        <img src={ logo } className="App-logo d-inline-block align-top" alt="logo" height={ 30 }/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Form className="form-inline header-form">
                    <Search onChange={ this.bindings.onChangeSearch } />
                </Navbar.Form>
            </header>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems: query => dispatch(get(urls.getItems, 'ITEMS', { q: query }))
    }
};

export default connect(null, mapDispatchToProps)(Header);
