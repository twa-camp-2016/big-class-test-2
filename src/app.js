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
        } else {
            cur.push(Object.assign({}, newVal));
        }
        return cur;
    }, []);
    return itemsCount;
}

function matchPromotions(itemsCount, allPromoteItems) {
    let itemsPromotionList = [];
    itemsCount.find(function (items) {
        allPromoteItems.find(function (item) {
            let type = "1";
            let existItems = item.barcodes.find(function (barcode) {
                return barcode === items.barcode;
            });
            if (existItems) {
                type = item.type;
            }
            itemsPromotionList.push(Object.assign({}, items, {type: type}));
        });
    });
    return itemsPromotionList;
}

function matchItems(itemsPromotionList, allItems) {
    let itemsList = [];
    itemsPromotionList.find(function (items) {
        let existItems = allItems.find(function (item) {
            if (item.barcode === items.barcode)
                return item;
        });
        if (existItems) {
            itemsList.push(Object.assign({}, existItems, {count: items.count}, {type: items.type}));
        }
    });
    return itemsList;
}
function calculateSubtotal(itemsList) {
    let itemSubtotal = [];
    let subtotal = 0;
    itemsList.find(function (item) {
        subtotal = item.count * item.price;
        itemSubtotal.push(Object.assign({}, item, {subtotal: subtotal}));
    });
    return itemSubtotal;
}

function calculateSavedSubtotal(itemsList) {
    let itemsDiscountSubtotal = [];
    let discountSubtotal = 0;
    itemsList.find(function (item) {
        if (item.type === "BUY_TWO_GET_ONE_FREE") {
            discountSubtotal = item.count * item.price - item.price * (parseInt(item.count / 3));
        }
        else if (item.type === "1") {
            discountSubtotal = item.price * item.count;
        }
        itemsDiscountSubtotal.push(Object.assign({}, item, {discountSubtotal: discountSubtotal}));
    });
    return itemsDiscountSubtotal;
}

function calculateTotal(itemsDiscountSubtotal) {
    let total = 0;
    itemsDiscountSubtotal.find(function (item) {
        total += item.discountSubtotal;
    });
    return total;
}

function getDiscount(itemSubtotal, itemsDiscountSubtotal) {
    let discount = 0;
    itemSubtotal.find(function (item, index, arr) {
        discount += item.subtotal - itemsDiscountSubtotal[index].discountSubtotal;
    });
    return discount;
}

function print(itemsDiscountSubtotal, total, discount) {
    var receiptText = '***<没钱赚商店>收据***\n';
    itemsDiscountSubtotal.find(function (item) {
        receiptText += '名称：' + item.name
            + '，数量：' + item.count + item.unit
            + '，单价：' + item.price.toFixed(2) + '(元)'
            + '，小计：' + item.discountSubtotal.toFixed(2) + '(元)' + '\n';
    });
    receiptText += '----------------------\n'
        + '总计：' + total.toFixed(2) + '(元)' + '\n' + '节省：' + discount.toFixed(2) + '(元)' + '\n'
        + '**********************';
    return receiptText;
}
function printReceipt(tags) {
    let allItems = load.loadAllItems();
    let allPromoteItems = load.loadPromotions();
    let itemsTag = separateTags(tags);
    let itemsCount = amountBarcodes(itemsTag);
    let itemsPromotionList = matchPromotions(itemsCount, allPromoteItems);
    let itemsList = matchItems(itemsPromotionList, allItems);
    let itemSubtotal = calculateSubtotal(itemsList);
    let itemsDiscountSubtotal = calculateSavedSubtotal(itemsList);
    let total = calculateTotal(itemsDiscountSubtotal);
    let discount = getDiscount(itemSubtotal, itemsDiscountSubtotal);
    let receiptText = print(itemsDiscountSubtotal, total, discount);
    console.log(receiptText);
}

module.exports = {
    separateTags: separateTags,
    amountBarcodes: amountBarcodes,
    matchPromotions: matchPromotions,
    matchItems: matchItems,
    calculateSubtotal: calculateSubtotal,
    calculateSavedSubtotal: calculateSavedSubtotal,
    calculateTotal: calculateTotal,
    getDiscount: getDiscount,
    printReceipt: printReceipt
};





































