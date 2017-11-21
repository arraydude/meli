const adapter = item => {
    const {
        id,
        title,
        price: amount,
        currency_id: currency,
        thumbnail: picture,
        condition,
        shipping,
        category_id: category
    } = item;
    const { free_shipping } = shipping;
    const priceSplitted = amount.toString().split('.');
    const decimals = priceSplitted.length > 1 ? priceSplitted[1] : null;

    return {
        id,
        title,
        price: {
            amount,
            currency,
            decimals
        },
        picture,
        condition,
        free_shipping,
        category
    };
};

export default adapter;
