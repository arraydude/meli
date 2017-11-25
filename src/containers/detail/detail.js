import PropTypes from 'prop-types';
import { get } from '../../requests';
import { connect } from 'react-redux';
import { urls } from '../../reducers/items';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './detail.css';

class Detail extends Component {
    static PropTypes = {
        getItem: PropTypes.func,
        item: PropTypes.object
    };

    static defaultProps = {
        getItem: () => {},
        item: {}
    };

    componentWillMount() {
        const { item } = this.props;

        if (!Object.keys(item).length || !item.description ) {
            this.props.getItem();
        }
    }

    render() {
        return (
            <div>
                <h1>Detail page</h1>

                <code>{ JSON.stringify(this.props.item) }</code>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: state.items.elements.find(item => item.id === ownProps.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getItem: () => dispatch(get(urls.getItem(ownProps.match.params.id), 'ITEM'))
    };
};

const withRedux = connect(mapStateToProps, mapDispatchToProps)(Detail);
const component = withRouter(withRedux);

export default component;
