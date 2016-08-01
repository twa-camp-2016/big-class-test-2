'use strict';

const fix = require('../spec/fixture');

function dividedItems(inputs) {
    let result = [];
    inputs.forEach(function (input) {
        let temp = input.split('-');
        result.push({barcode: temp[0], count: parseFloat(temp[1]) || 1});
    });
    return result;
}

function computeItems(inputDivide) {
    let result = [];
    inputDivide.forEach(function (input) {
        let exist = result.find(function (item) {
            return item.barcode === input.barcode;
        });
        if (exist) {
            exist.amount += input.count;
        }
        else {
            result.push({barcode: input.barcode, amount: 1});
        }
    });
    return result;
}

function generateItems(inputDivideCompute, items) {
    let result = [];
    inputDivideCompute.forEach(function (input) {
        let exist = items.find(function (item) {
            return input.barcode === item.barcode;
        });
        if (exist) {
            result.push(Object.assign({}, exist, {
                amount: input.amount
            }));
        }
    });
    return result;
}

function computeSubtotal(itemsMatch, promotionArray) {
    let result = [];
    itemsMatch.forEach(function (promotion) {
        let exist = promotionArray[0].barcodes.find(function (item) {
            return item === promotion.barcode;
        });
        result.push(Object.assign({}, promotion,
            {
                subtotal: (promotion.amount - parseInt(promotion.amount / 3)) * promotion.price,
                save: parseInt(promotion.amount / 3) * promotion.price
            }));
    });
    return result;
}

function computeTotal(itemsSubtotal) {
    let result = [];
    let sum = 0;
    let save = 0;
    itemsSubtotal.forEach(function (item) {
        sum += item.subtotal;
        save += item.save;
    })
    result.push(sum);
    result.push(save);
    return result;
}

function print(itemsSubtotal, total) {
    let result = `***<没钱赚商店>收据***`;
    itemsSubtotal.forEach(function (item) {
        result += `\n名称：` + item.name + `，` + `数量：` + item.amount + item.unit + `，` + `单价：` + item.price.toFixed(2) + `(元)` + `，` + `小计：` + item.subtotal.toFixed(2) + `(元)`;
    })
    result += `\n----------------------`;
    result += `\n总计：` + total[0].toFixed(2) + `(元)`;
    result += `\n节省：` + total[1].toFixed(2) + `(元)`;
    result += `\n**********************`;
    return result;
}

function printReceipt(inputs) {
    let items = fix.loadAllItems();
    let promotionsArray = fix.loadPromotions();
    let inputDivide = dividedItems(inputs);
    let inputDivideCompute = computeItems(inputDivide);
    let itemsMatch = generateItems(inputDivideCompute, items);
    let itemsSubtotal = computeSubtotal(itemsMatch, promotionsArray);
    let total = computeTotal(itemsSubtotal);
    let result = print(itemsSubtotal, total);
    return result;
}
module.exports = {
    dividedItems: dividedItems,
    computeItems: computeItems,
    generateItems: generateItems,
    computeSubtotal: computeSubtotal,
    computeTotal: computeTotal,
    print: print,
    printReceipt: printReceipt
};