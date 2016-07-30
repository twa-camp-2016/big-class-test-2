"use strict"

let fn = require('../spec/fixture')

function printReceipt(tags) {
    let allItems = fn.loadAllItems();
    let promotions = fn.loadAllItems();

    let barcodes = formateBarcode(tags);
    let mergedBarcodes = mergeBarcode(barcodes);
    let itemsInfo = getItemsInfo(allItems, mergedBarcodes);
    let subtotaledItem = calculateSubotal(itemsInfo);
    let total = calculateTotal(subtotaledItem);
    let promotionedId = getPromotionsIds(promotions)

    let promotiondItem = calculatePromotion(subtotaledItem, promotionedId)
    let second = promotiondTotal(promotiondItem);

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

function calculateSubotal(itemsInfo) {
   return itemsInfo.map(function (item) {
       let temp = item.price * item.count;
        return item = Object.assign({}, item, {subotal: temp})
    });
}

function calculateTotal(subtotaledItem) {
    let total = 0;
   for(let item of subtotaledItem) {
       total += item.subtotal;
   }
    return total;
}

function getPromotionsIds(promotions) {
    let prototionedId = [];
    promotions.forEach(function (p) {
        if(p.type === 'BUY_TWO_GET_ONE_FREE') {
            prototionedId =  p.barcodes;
        }
    });
    return prototionedId;
}

function calculatePromotion(subtotaledItem, prototionedId) {
    return subtotaledItem.map(function (item) {
        let exit = prototionedId.find(function (p) {
            return p === item.barcode;
        })
        if(exit) {
            let temp =  parseInt(item.count / 3);
            let save = temp * item.price;
            let savesbutotal = item.subtotal - save;
            return Object.assign({}, item, {save: save, saveSubtotal:savesbutotal})
        }else  {
            return Object.assign({}, item, {save: 0, saveSubtotal:0})
        }
    })

}

function promotiondTotal(promotionedItems) {
    let save = 0, saveTotal = 0;
    for(let item of promotionedItems) {
        save += item.save;
        saveTotal += item.savedSubtotal;
    }
    return {
        save: save,
        total: saveTotal
    };
}

function judge(total, second) {

}

module.exports = {
    formateBarcode: formateBarcode,
    mergedBarcode: mergeBarcode,
    getItemsInfo: getItemsInfo,
    calculateSubotal: calculateSubotal,
    calculateTotal: calculateTotal,
    getPromotionsIds: getPromotionsIds,
    calculatePromotion: calculatePromotion,
    promotiondTotal: promotiondTotal,

};