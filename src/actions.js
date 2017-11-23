export const requested = (type) => {
    return {
        type: `REQUEST_${type.toUpperCase()}`
    };
};

export const received = (type, url, method, params, data) => {
    return {
        data,
        type: `RECEIVE_${type.toUpperCase()}`,
        params
    };
};

export const receivedWithError = (type, url, method, params, data) => {
    return {
        data,
        type: `ERROR_${type.toUpperCase()}`,
        params
    };
};