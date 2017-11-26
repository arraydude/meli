import PropTypes from 'prop-types';
import { get } from '../../requests';
import { connect } from 'react-redux';
import { urls } from '../../reducers/items';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Row, Col, Image, Alert } from 'react-bootstrap';

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

    constructor(props) {
        super(props);

        this.translations = {
            'used': 'usado',
            'new': 'nuevo'
        }
    }

    componentWillMount() {
        const { item } = this.props;

        if (!Object.keys(item).length || !item.description ) {
            this.props.getItem();
        }
    }

    render() {
        if (!Object.keys(this.props.item).length) {
            return false;
        }

        const { title, picture, description, condition, free_shipping, price } = this.props.item;

        return (
            <Grid className='detail'>
                <Row>
                    <Col xs={12} md={8} className='detail-leftColumn'>
                        <Image src={ picture } responsive={ true } className='detail-picture' />
                    </Col>
                    <Col xs={6} md={4} className='detail-rightColumn'>
                        <p className='detail-condition'>{ this.translations[condition] } </p>
                        <h3>{ title }</h3>
                        { price && <p className='detail-price'>$ { price.amount.toLocaleString() }</p> }
                        { free_shipping && <Alert bsStyle="success" className='detail-freeShipping'><h4>Envio Gratuito!</h4></Alert> }
                    </Col>
                </Row>
                <Row className='detail-description'>
                    <Col>
                        <p>{ description }</p>
                    </Col>
                </Row>
            </Grid>
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
