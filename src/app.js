'use strict';
function separateTags(tags) {
    return tags.map(function (tag) {
        let info = tag.split('-');
        return {
            barcode: info[0],
            count: parseFloat(info[1]) || 1
        }
    });
}

function amountBarcodes(itemsTag) {
    let itemsCount = [];
    itemsCount = itemsTag.reduce(function (cur, newVal) {
        let exist = cur.find(function (item) {
            return item.barcode === newVal.barcode;
        });
        if (exist) {
            exist.count += newVal.count;
        }
        else {
            cur.push(Object.assign({}, newVal));
        }
        return cur;
    }, []);
    return itemsCount;
}

module.exports = {
    separateTags: separateTags,
    amountBarcodes: amountBarcodes
};





































