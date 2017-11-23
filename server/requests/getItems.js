import config from '../config'
import { get } from '../requests';
import adapter from '../adapter';

const getItems = (req, res) => {
    const request = get(`/sites/MLA/search?q=${req.query.q}`);

    request.then(response => {
        const { author } = config.api;
        const categories = [];
        const items = [];

        if (response.results) {
            response.results.forEach(item => {
                const itemAdapted = adapter(item);
                const { category, ...itemToBeAdded } = itemAdapted;

                categories.push(category);
                items.push(itemToBeAdded);
            });

            return {
                author,
                categories,
                items
            }
        }

        return response;
    }).then(json => res.json(json));
};

export default getItems;
