import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListGroup, ListGroupItem, Media } from 'react-bootstrap';

import './listing.css';

const Listing = ({items}) => (
    <ListGroup>
        { items.map(item => (
            <ListGroupItem>
                <Media>
                    <Media.Left>
                        <img className='listing-thumbnail' src={ item.picture } alt={ item.title } />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>{ item.price.currency } { item.price.amount }</Media.Heading>
                        <p>{ item.title }</p>
                    </Media.Body>
                </Media>
            </ListGroupItem>
        )) }
    </ListGroup>
);

Listing.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

Listing.defaultProps = {
    items: []
};

const mapStateToProps = state => {
    return {
        items: state.items.listing
    }
};

export default connect(mapStateToProps, null)(Listing);
