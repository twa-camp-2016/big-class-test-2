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

module.exports = {
    formatTags: formatTags,
    getAmount: getAmount
};