'use strict';
const load = require("../spec/fixture");

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

function matchPromotions(itemsCount, allPromoteItems) {
    let itemsPromotionList = [];
    for (let i = 0; i < itemsCount.length; i++) {
        allPromoteItems.find(function (item) {
            let type = "1";
            let existItems = item.barcodes.find(function (barcode) {
                return barcode === itemsCount[i].barcode;
            });
            if (existItems) {
                type = item.type;
            }
            itemsPromotionList.push(Object.assign({}, itemsCount[i], {type: type}));
        });
    }

    return itemsPromotionList;
}

function matchItems(itemsPromotionList, allItems) {
    let itemsList = [];
    for (let i = 0; i < itemsPromotionList.length; i++) {
        let existItems = allItems.find(function (item) {
            return item.barcode === itemsPromotionList[i].barcode;
        });
        if (existItems) {
            itemsList.push(Object.assign({}, existItems, {count: itemsPromotionList[i].count},
                {type: itemsPromotionList[i].type}));
        }
    }
    return itemsList;
}

function calculateSubtotal(itemsList) {
    let itemSubtotal = [];
    let subtotal = 0;
    itemsList.find(function (item) {
        subtotal = item.price * item.count;
        itemSubtotal.push(Object.assign({}, item, {subtotal: subtotal}));
    });
    return itemSubtotal;
}

function calculateSavedSubtotal(itemsList) {
    let itemsDiscountSubtotal = [];
    let discountSubtotal = 0;
    itemsList.find(function (item) {
        if (item.type === 'BUY_TWO_GET_ONE_FREE') {
            discountSubtotal = item.price * item.count - item.price * (parseInt(item.count / 3));
        }
        else if (item.type === '1') {
            discountSubtotal = item.price * item.count;
        }
        itemsDiscountSubtotal.push(Object.assign({}, item, {discountSubtotal: discountSubtotal}));
    });
    return itemsDiscountSubtotal;
}

module.exports = {
    separateTags: separateTags,
    amountBarcodes: amountBarcodes,
    matchPromotions: matchPromotions,
    matchItems: matchItems,
    calculateSubtotal: calculateSubtotal,
    calculateSavedSubtotal: calculateSavedSubtotal
};





































