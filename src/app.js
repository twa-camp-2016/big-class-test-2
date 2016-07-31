"use strict"

function formatTags(tags) {
    return tags.map(function (tags) {
        let temp = tags.split("-");
        return {
            barcode: temp[0],
            amount: parseFloat(temp[1]) || 1
        }
    });
}

function mergeBarcode(formattedTags) {
    let mergedBarcode = [];
    mergedBarcode = formattedTags.reduce(function (cur, newVal) {
        let exist = cur.find(function (item) {
            return item.barcode === newVal.barcode;
        });
        if (!exist) {
            exist = Object.assign({}, newVal, {amount: 0});
            cur.push(exist);
        }
        exist.amount += newVal.amount;
        return cur;
    }, []);

    return mergedBarcode;
}

function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}


function getAmountItems(mergedBarcode, allItems) {
    let amountItems = [];
    for (let i = 0; i < allItems.length; i++) {
        let exist = mergedBarcode.find(function (items) {
            return items.barcode === allItems[i].barcode;

        });
        if (exist) {
            amountItems.push(Object.assign({}, allItems[i], {amount: exist.amount}));
        }
    }
    return amountItems;
}

function getOriginSubtotal(amountItems) {
    return amountItems.map(function (item) {
        return Object.assign({}, item, {originSubtotal: item.amount * item.price});
    });
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}

function getPromotions(originSubtotal, promotions) {
    let savedPromotions = [];
    for (let i = 0; i < originSubtotal.length; i++) {

        let exist = (promotions[0].barcodes).find(function (items) {
            return items === originSubtotal[i].barcode;
        });
        let savedAmount = Math.floor(originSubtotal[i].amount / 3);
        let savedMoney = savedAmount * originSubtotal[i].price;
        savedPromotions.push(Object.assign({}, originSubtotal[i], {savedAmount: savedAmount || 0}, {savedMoney: savedMoney || 0}));
    }
    return savedPromotions;
}

function getSubtotal(savedPromotions) {
    return savedPromotions.map(function (item) {
        return Object.assign({}, item, {subtotal: item.originSubtotal - item.savedMoney});
    });
}

function getTotal(detailItems) {
    let total = 0;
    for (let i = 0; i < detailItems.length; i++) {
        total += detailItems[i].subtotal;
    }
    return total;
}

function getTotalSavedMoney(savedPromotions) {
    let totalSavedMoney = 0;
    for (let i = 0; i < savedPromotions.length; i++) {
        totalSavedMoney += savedPromotions[i].savedMoney;
    }
    return totalSavedMoney;
}
function print(detailItems, totalSavedMoney, total) {
    let receipt = {detailItems: detailItems};
    let print = "***<没钱赚商店>收据***" + "\n";
    for (let i = 0; i < receipt.detailItems.length; i++) {
        print += "名称：" + receipt.detailItems[i].name + "，" + "数量：" + receipt.detailItems[i].amount
            + receipt.detailItems[i].unit + "，" + "单价：" + receipt.detailItems[i].price.toFixed(2) + "(元)"
            + "，" + "小计：" + receipt.detailItems[i].subtotal.toFixed(2) + "(元)" + "\n";
    }
    print += "----------------------" + "\n" + "总计：" + total.toFixed(2) + "(元)" + "\n"
        + "节省：" + totalSavedMoney.toFixed(2) + "(元)" + "\n" + "**********************";
    return print;
}

function printReceipt(tags) {
    let formattedTags = formatTags(tags);
    let mergedBarcode = mergeBarcode(formattedTags);
    let allItems = loadAllItems();
    let amountItems = getAmountItems(mergedBarcode, allItems);
    let originSubtotal = getOriginSubtotal(amountItems);
    let promotions = loadPromotions();
    let savedPromotions = getPromotions(originSubtotal, promotions);
    let detailItems = getSubtotal(savedPromotions);
    let total = getTotal(detailItems);
    let totalSavedMoney = getTotalSavedMoney(savedPromotions);
    return print(detailItems, totalSavedMoney, total);
}

module.exports = {
    formatTags: formatTags,
    mergeBarcode: mergeBarcode,
    loadAllItems: loadAllItems,
    getAmountItems: getAmountItems,
    getOriginSubTotal: getOriginSubtotal,
    loadPromotions: loadPromotions,
    getPromotions: getPromotions,
    getSubtotal: getSubtotal,
    getTotal: getTotal,
    getTotalSavedMoney: getTotalSavedMoney,
    print: print,
    printReceipt: printReceipt
};

