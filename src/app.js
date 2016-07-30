function formatTags(tags) {
    return tags.map(c=> {
        let temp = c.split('-');
        return {
            barcode: temp[0],
            amount: Number(temp[1]) || 1
        };
    });
}
function getAmount(formattedTags) {
    let barcodesAmount = [];
    for (let i = 0; i < formattedTags.length; i++) {
        let j;
        for (j = 0; j < barcodesAmount.length; j++)
            if (formattedTags[i].barcode === barcodesAmount[j].barcode)
                break;
        if (j === barcodesAmount.length) {
            barcodesAmount[j] = {barcode: formattedTags[i].barcode, amount: formattedTags[i].amount};
        }
        else {
            barcodesAmount[j].amount += formattedTags[i].amount;
        }
    }
    return barcodesAmount;
}
function getItemsAmount(barcodesAmount, items) {
    let itemsAmount = [];
    for (let i = 0; i < barcodesAmount.length; i++) {
        for (let j = 0; j < items.length; j++)
            if (barcodesAmount[i].barcode === items[j].barcode) {
                itemsAmount[i] = {
                    barcode: items[j].barcode,
                    name: items[j].name,
                    unit: items[j].unit,
                    price: items[j].price,
                    amount: barcodesAmount[i].amount,
                };
                break;
            }
    }
    return itemsAmount;
}
function getSubtotal(itemsAmount) {
    let itemsSubtotal = [];
    for (let i = 0; i < itemsAmount.length; i++) {
        itemsSubtotal[i] = {
            barcode: itemsAmount[i].barcode,
            name: itemsAmount[i].name,
            unit: itemsAmount[i].unit,
            price: itemsAmount[i].price,
            amount: itemsAmount[i].amount,
            subtotal: itemsAmount[i].amount * itemsAmount[i].price
        }
    }
    return itemsSubtotal;
}

module.exports = {
    formatTags: formatTags,
    getAmount: getAmount,
    getItemsAmount: getItemsAmount,
    getSubtotal: getSubtotal
};