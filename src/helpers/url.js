const paramsToQueryString = params => {
    const strParams = [];

    for (const param in params) {
        if (params.hasOwnProperty(param)) {
            const queryStringParam = typeof params[param] === 'string' ? params[param] : JSON.stringify(params[param]);

            strParams.push(`${param}=${encodeURIComponent(queryStringParam)}`);
        }
    }

    return strParams.join('&');
};

const queryStringToParams = queryString => {
    const response = {};
    const decodedQS = decodeURI(queryString).split('&');

    decodedQS.forEach(param => {
        const [paramKey, paramValue] = param.split('=');

        try {
            response[paramKey] = JSON.parse(paramValue);
        }
        catch (e) {
            response[paramKey] = decodeURIComponent(paramValue);
        }
    });

    return response;
};

export default {
    paramsToQueryString,
    queryStringToParams
};
