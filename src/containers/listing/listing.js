import React, { PureComponent } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import urlHelper from '../../helpers/url';
import { withRouter } from 'react-router-dom';

import './listing.css';

class Listing extends PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        items: []
    };

    render() {
        const { items } = this.props;

        return (
          <ul className='listing'>
              { items.map(item => (
                <li className='listing-item' key={ item.id }>
                    <div className='leftColumn'>
                        <Link to={ `/${ item.id }-${ urlHelper.slugify(item.title) }` }>
                            <img className='listing-thumbnail' width={ 90 } height={ 90 } src={ item.picture }
                                 alt={ item.title }/>
                        </Link>
                    </div>
                    <div className='rightColumn'>
                        <Link to={ `/${ item.id }-${ urlHelper.slugify(item.title) }` }>
                            <p className='listing-itemTitle'>{ item.title }</p>
                        </Link>
                        <p className='listing-itemPrice'>{ item.price.currency } { item.price.amount }</p>
                    </div>
                </li>
              )) }
          </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items.listing.map(id => state.items.elements.find(el => el.id === id))
    }
};

export default compose(
  connect(mapStateToProps, null),
  withRouter
)(Listing);
