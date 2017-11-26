import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import urlHelper from '../../helpers/url';
import { withRouter } from 'react-router-dom';

import './listing.css';

const Listing = ({ items }) => (
    <ul className='listing'>
        {items.map(item => (
            <li className='listing-item' key={item.id}>
                <div className='leftColumn'>
                    <Link to={`/${ item.id }-${ urlHelper.slugify(item.title) }`}>
                        <img className='listing-thumbnail' width={90} height={90} src={item.picture}
                             alt={item.title}/>
                    </Link>
                </div>
                <div className='rightColumn'>
                    <Link to={`/${ item.id }-${ urlHelper.slugify(item.title) }`}>
                        <p className='listing-itemTitle'>{item.title}</p>
                    </Link>
                    <p className='listing-itemPrice'>{item.price.currency} {item.price.amount}</p>
                </div>
            </li>
        ))}
    </ul>
);

Listing.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

Listing.defaultProps = {
    items: []
};

const mapStateToProps = state => {
    return {
        items: state.items.listing.map(id => state.items.elements.find(el => el.id === id))
    }
};

const withRedux = connect(mapStateToProps, null)(Listing);
const component = withRouter(withRedux);

export default component;
