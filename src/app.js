/* global module */
"use strict"

let tags =
    [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
    ];

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
    for (let i = 0; i < formattedTags.length; i++) {
        let exist = mergedBarcode.find(function (item) {
            return item.barcode === formattedTags[i].barcode;
        });
        if (exist) {
            exist.amount += formattedTags[i].amount;
        } else {
            mergedBarcode.push(Object.assign({}, {barcode: formattedTags[i].barcode}, {amount: formattedTags[i].amount}))
        }
    }
    return mergedBarcode;
}

function loadAllItems() {
    return [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
    },
        {
            barcode: 'ITEM000005',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000001',
            name: '羽毛球',
            unit: '个',
            price: 1.00
        }
    ]
}

function getAmountItems(mergedBarcode,allItems){
    let amountItems = [];
    for(let i = 0 ; i < allItems.length; i++) {
        let exist = mergedBarcode.find(function (items) {
            return items.barcode === allItems[i].barcode;

        });
        if (exist) {
            amountItems.push(Object.assign({}, allItems[i], {amount: exist.amount}));
        }
    }
}


module.exports = {
    formatTags: formatTags,
    mergeBarcode:mergeBarcode

};

