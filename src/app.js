'use strict'
const items = require('../spec/fixture');
function printRecript(barcodes) {
    let allItems = items.loadAllItems();
    let allPromotions = items.loadPromotions();
    let formatedBarcodes = formatBarcodes(barcodes);
    let mergedBarcodes = mergeBarcodes(formatedBarcodes);
    let cartItems = getCartItems(mergedBarcodes, allItems);
    let promotedCartItems = getSubSaveMoney(cartItems);
    let detailedCartItems = getSubTotal(promotedCartItems);
    let totalAndSaveMoney = getTotalAndSaveMoney(detailedCartItems);
    return print(detailedCartItems, totalAndSaveMoney);
}
function formatBarcodes(barcodes) {
    return barcodes.map(function (barcode) {
        let temp = barcode.split('-');
        return {barcode: temp[0], amount: parseFloat(temp[1]) || 1};
    });
}

function mergeBarcodes(formatedBarcodes) {
    return formatedBarcodes.reduce(function (cur, newValue) {
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
}

function getCartItems(mergedBarcodes, allItems) {
    let result = [];
    allItems.reduce(function (cur, newValue) {
        let exist = cur.find(function (item) {
            return item.barcode === newValue.barcode;
        });
        if (exist) {
            result.push(Object.assign({}, newValue, {amount: exist.amount}));
        }
        return cur;
    }, mergedBarcodes);
    return result;
}

function getSubSaveMoney(cartItems, allPromotions) {
    let promotedCartItems = [];
    cartItems.reduce(function (cur, newValue) {
        let i = 0;
        let exist = cur.find(function (item) {
            return item.barcodes[i++] === newValue.barcode;
        });
        if (exist) {
            promotedCartItems.push(Object.assign({}, newValue, {subSaveMoney: parseInt(newValue.amount / 3) * newValue.price}));
        }
        else {
            promotedCartItems.push(Object.assign({}, newValue, {subSaveMoney: 0}));
        }
        return cur;
    }, allPromotions);
    return promotedCartItems;
}

function getSubTotal(promotedCartItems) {
    return promotedCartItems.map(function (item) {
        return Object.assign({}, item, {subTotal: item.amount * item.price});
    });
}

function getTotalAndSaveMoney(detailedCartItems) {
    let total = 0, saveMoney = 0;
    for (let i = 0; i < detailedCartItems.length; i++) {
        total += detailedCartItems[i].subTotal;
        saveMoney += detailedCartItems[i].subSaveMoney;
    }
    total = total - saveMoney;
    return Object.assign({}, {total: total, saveMoney: saveMoney});
}

function print(detailedCartItems, totalAndSaveMoney) {
    let receiptString = '***<没钱赚商店>***收据';
    for (let item of detailedCartItems) {
        receiptString += '\n' + `名称:${item.name},数量:${item.amount}${item.unit},单价:${item.price}元,小计:${item.subTotal - item.subSaveMoney}`;
    }
    receiptString += '\n' + `--------------
总计:${totalAndSaveMoney.total}(元)
节省:${totalAndSaveMoney.saveMoney}(元)`;
    return receiptString;
}


module.exports = {
    formatBarcodes: formatBarcodes,
    mergeBarcodes: mergeBarcodes,
    getCartItems: getCartItems,
    getSubSaveMoney: getSubSaveMoney,
    getSubTotal: getSubTotal,
    getTotalAndSaveMoney: getTotalAndSaveMoney,
    print: print,
    printReceipt: printRecript
}