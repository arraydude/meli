import React from 'react';
import PropTypes from 'prop-types';

import './spinner.css';

const Spinner = ({ size }) => {
    return (
        <div className="spinner-overlay">
            <svg className="spinner-container"
                 width={ size }
                 height={ size }
                 viewBox="0 0 52 52">
                <circle
                        cx="26px"
                        cy="26px"
                        r="20px"
                        fill="none"
                        strokeWidth="4px"
                />
            </svg>
        </div>
    );
};

Spinner.propTypes = {
    size: PropTypes.number
};

Spinner.defaultProps = {
    size: 150
};

export default Spinner;
