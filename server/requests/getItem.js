import { get } from '../requests';
import adapter from '../adapter';

const getItem = (req, res) => {
    const { id } = req.params;
    const itemApiURL = `/items/${id}`;
    const promises = [
        get(itemApiURL),
        get(`${itemApiURL}/description`)
    ];

    Promise.all(promises)
        .then(response => {
            const item = response[ 0 ];
            const description = response[ 1 ];
            const json = Object.assign({}, adapter(item), {
                description: description && description.plain_text
            });

            res.send(JSON.stringify(json));
        });
};

export default getItem;
