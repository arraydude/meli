import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

import searchIcon from './assets/ic_Search.png';

class Search extends Component {
    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.bindings = {
            handleChange: this.handleChange.bind(this),
            handleKeyPress: this.handleKeyPress.bind(this),
            handleSubmit: this.handleSubmit.bind(this)
        };

        this.state = {
            value: ''
        };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            this.handleSubmit();
        }
    }

    handleSubmit() {
        const { value } = this.state;

        this.props.onChange(value);
    }

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <FormControl className="search-input"
                                 type="text"
                                 placeholder="Nunca dejes de buscar"
                                 value={this.state.value}
                                 onChange={this.bindings.handleChange}
                                 onKeyPress={this.bindings.handleKeyPress}
                    />
                    <InputGroup.Button>
                        <Button onClick={this.bindings.handleSubmit}>
                            <img src={searchIcon} alt="Search"/>
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

export default Search;
