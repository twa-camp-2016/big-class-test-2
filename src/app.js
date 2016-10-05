//noinspection JSUnresolvedFunction
let fix = require('../spec/fixture.js');

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
function getSubtotalPromotion(promotions, itemsSubtotal) {
    let itemsSubtotalPromotion = [];
    for (let i = 0; i < itemsSubtotal.length; i++)
        itemsSubtotalPromotion[i] = {
            barcode: itemsSubtotal[i].barcode,
            name: itemsSubtotal[i].name,
            unit: itemsSubtotal[i].unit,
            price: itemsSubtotal[i].price,
            amount: itemsSubtotal[i].amount,
            subtotal: itemsSubtotal[i].subtotal
        };

    for (let i = 0; i < itemsSubtotal.length; i++) {
        let j;
        for (j = 0; j < promotions.length; j++) {
            let k;
            for (k = 0; k < promotions[j].barcodes.length; k++)
                if (promotions[j].barcodes[k] === itemsSubtotal[i].barcode)
                    break;
            if (k !== promotions[j].barcodes.length)
                break;
        }
        if (j !== promotions.length)
            switch (promotions[j].type) {
                case 'BUY_TWO_GET_ONE_FREE':
                    itemsSubtotalPromotion[i].subtotal -= itemsSubtotal[i].price * parseInt(itemsSubtotal[i].amount / 3);
                    break;
            }
    }
    return itemsSubtotalPromotion;
}
function getReceipt(itemsSubtotalPromotion, itemsSubtotal) {
    let total = 0, totalPromotion = 0;
    for (let i = 0; i < itemsSubtotal.length; i++)
        total += itemsSubtotal[i].subtotal;
    for (let i = 0; i < itemsSubtotalPromotion.length; i++)
        totalPromotion += itemsSubtotalPromotion[i].subtotal;

    let receipt = '\n***<没钱赚商店>收据***\n';
    for (let i = 0; i < itemsSubtotal.length; i++)
        receipt += '名称：' + itemsSubtotal[i].name + '，数量：' + itemsSubtotal[i].amount + itemsSubtotal[i].unit + '，单价：' + Number(itemsSubtotal[i].price).toFixed(2) + '(元)' + '，小计：' + Number(itemsSubtotalPromotion[i].subtotal).toFixed(2) + '(元)\n';
    receipt += '----------------------\n';
    receipt += '总计：' + Number(totalPromotion).toFixed(2) + '(元)\n';
    if (totalPromotion < total)
        receipt += '节省：' + Number(total - totalPromotion).toFixed(2) + '(元)\n';
    receipt += '**********************';

    return receipt;
}
function printReceipt(tags) {
    let formattedTags = formatTags(tags);
    let barcodesAmount = getAmount(formattedTags);
    let items = fix.loadAllItems();
    let itemsAmount = getItemsAmount(barcodesAmount, items);
    let itemsSubtotal = getSubtotal(itemsAmount);
    let promotions = fix.loadPromotions();
    let itemsSubtotalPromotion = getSubtotalPromotion(promotions, itemsSubtotal);
    return getReceipt(itemsSubtotalPromotion, itemsSubtotal);
}

module.exports = {
    formatTags: formatTags,
    getAmount: getAmount,
    getItemsAmount: getItemsAmount,
    getSubtotal: getSubtotal,
    getSubtotalPromotion: getSubtotalPromotion,
    getReceipt: getReceipt,
    printReceipt: printReceipt
};