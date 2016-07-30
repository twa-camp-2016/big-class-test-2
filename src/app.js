"use strict"

function printReceipt(tags) {
    let allItems = loadAllItems();
    let promotions = loadAllItems();

    let barcodes = formateBarcode(tags);
    let mergedBarcodes = mergeBarcode(barcodes);
    let itemsInfo = getItemsInfo(allItems, mergedBarcodes);
}

function formateBarcode(tags) {
    return tags.map(function (tag) {
        let temp = tag.split('-');
        return {
            barcode:temp[0],
            count: parseInt(temp[1]) || 1
        }
    })
}

function mergeBarcode(barcodes) {
    let mergedBarcodes = [];
    barcodes.forEach(function (barcode) {
        let exit = mergedBarcodes.find(function (m) {
            return barcode.barcode === m.barcode;
        });
        if(exit) {
            exit.count += barcode.count;
        } else {
            mergedBarcodes.push(barcode);
        }
    })
    return mergedBarcodes;
}

function getItemsInfo(allItems, mergedBarcodes) {
    let itemsInfo = [];
    mergedBarcodes.map(function (merge) {
        let exit = allItems.find(function (item) {
            return item.barcode === merge.barcode;
        });
        if(exit) {
            itemsInfo.push(Object.assign({}, exit, {count: merge.count}))
        }
    });
    return itemsInfo;
}


module.exports = {
    formateBarcode: formateBarcode,
    mergedBarcode: mergeBarcode,
    getItemsInfo: getItemsInfo,
};