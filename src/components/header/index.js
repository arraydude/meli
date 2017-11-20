import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from 'react-bootstrap';
import Search from '../search';

import logo from './assets/Logo_ML.png';
import './style.css';

class Header extends Component {
    render() {
        return (
            <header className="navbar navbar-expand-lg header">
                <Navbar.Brand>
                    <Link to="/">
                        <img src={ logo } className="App-logo d-inline-block align-top" alt="logo" height={ 30 }/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Form className="form-inline header-form">
                    <Search />
                </Navbar.Form>
            </header>
        );
    }
}

export default Header;
