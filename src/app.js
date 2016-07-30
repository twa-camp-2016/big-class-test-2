'use strict'
function formatBarcodes(barcodes) {
    return barcodes.map(function (barcode) {
        let temp = barcode.split('-');
        return {barcode: temp[0], amount: parseFloat(temp[1]) || 1};
    });
}

function mergeBarcodes(formatedBarcodes) {
    let result = [];
    result = formatedBarcodes.reduce(function (cur, newValue) {
        let exist = cur.find(function (item) {
            return item.barcode === newValue.barcode;
        });
        if (exist) {
            exist.amount += newValue.amount;
        }
        else {
            cur.push(newValue);
        }
        return cur;
    }, []);
    return result;
}

module.exports = {
    formatBarcodes: formatBarcodes,
    mergeBarcodes: mergeBarcodes
}