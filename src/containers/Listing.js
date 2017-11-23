import React from 'react';
import { connect } from 'react-redux';

const Listing = props => (
    <div>
        <h1>Home</h1>
        <p>Welcome home!</p>
    </div>
);

const mapStateToProps = state => {
    return {
        state
    }
};

export default connect(mapStateToProps, null)(Listing);
