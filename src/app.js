'use strict';
const fixture = require('../spec/fixture.js');

function printReceipt(tags) {
    let allItems = fixture.loadAllItems();
    let allPromotions = fixture.loadPromotions();
    let barcodes = formatTags(tags);
    let barItems = mergeBarcodes(barcodes);
    let proItems = matchProType(barItems, allPromotions);
    let cartItems = getCartItems(proItems, allItems);
    let subItems = subTotal(cartItems);
    let proSubItems = proSubTotal(cartItems);
    let noPrototal = total(subItems);
    let proTotal = total(proSubItems);
    let promotion = getPromotions(proTotal, noPrototal);
    let str = printStr(proSubItems, proTotal, promotion);
    return str;

}
function formatTags(tags) {
    return tags.map(function (tag) {
        let parsTag = tag.split('-');
        return {
            barcode: parsTag[0],
            amount: parseFloat(parsTag[1]) || 1
        }
    });
}

function mergeBarcodes(barcodes) {
    let barItems = [];
    barcodes.forEach(function (code) {
        let exist = barItems.find(function (bar) {
            return bar.barcode === code.barcode;
        });

        if (exist) {
            exist.amount = exist.amount + code.amount;
        } else {
            barItems.push(code);
        }
    });

    return barItems;
}

function matchProType(barItems, allPromotions) {
    let proItems = [];
    barItems.forEach(function (item) {
        allPromotions.forEach(function (proItem) {
            let exist = proItem.barcodes.find(function (barcode) {
                return barcode === item.barcode;
            });
            if (exist) {
                proItems.push(Object.assign({}, item, {type: proItem.type}));
            } else {
                proItems.push(Object.assign({}, item, {type: '-1'}));
            }
        });
    });
    return proItems;
}

function getCartItems(proItems, allItems) {
    return proItems.map(function (pro) {
        let exist = allItems.find(function (item) {
            return item.barcode === pro.barcode;
        });
        if (exist) {
            return Object.assign({}, exist, {amount: pro.amount, type: pro.type});
        }
    });
    return cartItems;
}
function subTotal(cartItems) {
    return cartItems.map(function (item) {
        return {
            barcode: item.barcode,
            name: item.name,
            unit: item.unit,
            price: item.price,
            amount: item.amount,
            type: item.type,
            subtotal: parseFloat(item.price) * parseFloat(item.amount)
        }
    });
}
function proSubTotal(cartItems) {
    return cartItems.map(function (item) {
        let count = item.amount;
        if (item.type === 'BUY_TWO_GET_ONE_FREE') {
            count = parseInt(item.amount / 3) * 2 + item.amount % 3;
        }
        return {
            barcode: item.barcode,
            name: item.name,
            unit: item.unit,
            price: item.price,
            amount: item.amount,
            type: item.type,
            subtotal: count * parseFloat(item.price)
        }

    });
}
function total(subItems) {
    let total = 0;
    subItems.forEach(function (item) {
        total = parseFloat(item.subtotal) + parseFloat(total);
    });
    return total;
}
function getPromotions(proTotal, noPrototal) {
    return parseFloat(noPrototal) - parseFloat(proTotal);
}
function printStr(proSubItems, proSubtotal, promotion) {
    let str = '***<没钱赚商店>收据***';
    proSubItems.forEach(function (item) {
        str += '\n名称：' + item.name + '，数量：' + item.amount + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + item.subtotal.toFixed(2) + '(元)';
    });
    str += '\n----------------------';
    str += '\n总计：' + proSubtotal.toFixed(2) + '(元)';
    if (promotion !== 0) {
        str += '\n节省：' + promotion.toFixed(2) + '(元)';
    }
    str += '\n**********************';
    return str;
}
module.exports = {
    formatTags: formatTags,
    mergeBarcodes: mergeBarcodes,
    matchProType: matchProType,
    getCartItems: getCartItems,
    subTotal: subTotal,
    proSubTotal: proSubTotal,
    total: total,
    getPromotions: getPromotions,
    printStr: printStr,
    printReceipt: printReceipt,
    loadAllItems: fixture.loadAllItems,
    loadPromotions: fixture.loadPromotions,
};