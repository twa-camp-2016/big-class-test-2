'use strict';

const load = require("../spec/fixture.js");
function splitTag(tags) {
    let splitTag = tags.map(
        function (tags) {
            let temp = tags.split("-");
            return {
                barcode: temp[0],
                count: parseFloat(temp[1]) || 1
            }
        }
    );
    return splitTag;
}

function getTagCount(splitTag) {
    let allTagCount = [];
    for (let i = 0; i < splitTag.length; i++) {
        let existItem = allTagCount.find(
            function (item) {
                if (item.barcode === splitTag[i].barcode) {
                    return item;
                }
            }
        );
        if (existItem) {
            existItem.count += splitTag[i].count;
        } else {
            allTagCount.push(Object.assign({}, splitTag[i], {count: splitTag[i].count}));
        }
    }
    return allTagCount;
}

function matchPromotion(allTagCount, promotion) {
    let itemsPromotion = [];
    let type;
    allTagCount.find(function (items) {
        promotion.find(function (item) {
            let existItems = item.barcodes.find(function (barcode) {
                return barcode === items.barcode;
            });
            if (existItems) {
                type = item.type;
            }
            itemsPromotion.push(Object.assign({}, items, {type: type}));
        });
    });
    return itemsPromotion;
}

function matchItems(itemsPromotion, allItems) {
    let cartItemsCount = [];
    for (let i = 0; i < itemsPromotion.length; i++) {
        let existItems = allItems.find(function (item) {
            if (item.barcode === itemsPromotion[i].barcode) {
                return item;
            }
        });
        if (existItems) {
            cartItemsCount.push(Object.assign({}, existItems, {type: itemsPromotion[i].type}, {count: itemsPromotion[i].count}));
        }
    }
    return cartItemsCount;
}

function getDiscountSubtotal(cartItemsCount, promotion) {
    let discountSubtotalSum = 0;
    let discountSubtotal = [];
    for (let i = 0; i < cartItemsCount.length; i++) {
        discountSubtotalSum = cartItemsCount[i].price * cartItemsCount[i].count;
        let promotion1 = promotion[0];
        for (let j = 0; j < promotion1.barcodes.length; j++) {
            if (cartItemsCount[i].barcode === promotion1.barcodes[j]) {
                discountSubtotalSum -= cartItemsCount[i].price * (Math.floor(cartItemsCount[i].count / 3));
            }
        }
        discountSubtotal.push(Object.assign({}, cartItemsCount[i], {discountSubtotalSum: discountSubtotalSum}));
    }
    return discountSubtotal;
}

function getSubtotal(cartItemsCount) {
    let subtotal = [];
    let noDiscountSubtotal = 0;
    for (let i = 0; i < cartItemsCount.length; i++) {
        noDiscountSubtotal = cartItemsCount[i].price * cartItemsCount[i].count;
        subtotal.push(Object.assign({}, cartItemsCount[i], {noDiscountSubtotal: noDiscountSubtotal}));
    }

    return subtotal;
}

function getSaveTotal(discountSubtotal, subtotal) {
    let saveTotal = 0;
    for (let i = 0; i < subtotal.length; i++) {
        if (subtotal[i].barcode === discountSubtotal[i].barcode) {
            saveTotal += (subtotal[i].noDiscountSubtotal - discountSubtotal[i].discountSubtotalSum);
        }
    }
    return saveTotal;
}

function getTotal(discountSubtotal) {
    let total = 0;
    for (let i = 0; i < discountSubtotal.length; i++) {
        total += discountSubtotal[i].discountSubtotalSum;
    }
    return total;
}

function print(discountSubtotal, total, saveTotal) {
    let receiptText = '***<没钱赚商店>收据***\n';
    for (let i = 0; i < discountSubtotal.length; i++) {
        receiptText += '名称：' + discountSubtotal[i].name
            + ',数量：' + discountSubtotal[i].count + discountSubtotal[i].unit
            + ',单价：' + discountSubtotal[i].price + '元'
            + ',小计：' + discountSubtotal[i].discountSubtotalSum;

    }
    receiptText += '----------------------\n'
        + '总计：' + total + '(元)' + '\n' + '节省：' + saveTotal + ')' + '\n'
        + '**********************';
    return receiptText;
}
function printReceipt(tags) {
    let allItems = load.loadAllItems();
    let promotion = load.loadPromotions();
    let splitTag = splitTag(tags);
    let allTagCount = getTagCount(splitTag);
    let itemsPromotion = matchPromotion(allTagCount, promotion);
    let cartItemsCount = matchItems(itemsPromotion, allItems);
    let discountSubtotal = getDiscountSubtotal(cartItemsCount, loadPromotions());
    let subtotal = getSubtotal(cartItemsCount);
    let saveTotal = getSaveTotal(discountSubtotal, subtotal);
    let total = getTotal(discountSubtotal);
    let receiptText = print(discountSubtotal, total, saveTotal);
    console.log(receiptText);
}

module.exports = {
    splitTag: splitTag,
    getTagCount: getTagCount,
    matchPromotion: matchPromotion,
    matchItems: matchItems,
    getDiscountSubtotal: getDiscountSubtotal,
    getSubtotal: getSubtotal,
    getSaveTotal: getSaveTotal,
    getTotal: getTotal,
    printReceipt: printReceipt
};

