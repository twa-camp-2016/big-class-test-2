"use strict"

function printReceipt(tags) {
    let allItems = loadAllItems();
    let promotions = loadAllItems();

    let barcodes = formateBarcode(tags);

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
