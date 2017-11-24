import stringModule from 'string';

const paramsToQueryString = params => {
    const strParams = [];

    for (const param in params) {
        if (params.hasOwnProperty(param)) {
            const queryStringParam = typeof params[ param ] === 'string' ? params[ param ] : JSON.stringify(params[ param ]);

            strParams.push(`${param}=${encodeURIComponent(queryStringParam)}`);
        }
    }

    return strParams.join('&');
};

const slugify = string => stringModule(string).slugify().s;

export default {
    paramsToQueryString,
    slugify
};
