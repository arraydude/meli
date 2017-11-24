import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Alert bsStyle="danger">
            <h4>Oh snap! You got an error!</h4>
            <p>Page not found</p>
        </Alert>
    );
};

export default NotFound;
