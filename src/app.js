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
    let totalType = judge(total, second);

    console.log(allItems)
    console.log(promotiondItem)

    let receiptString = '';
    for(let item of subtotaledItem) {
        receiptString +=`
名称：${item.name}，数量：${item.count}瓶，小计：${item.subtotal}（元）`
    }
    if(totalType.save === 0) {
        receiptString += `
总计：${totalType.total}（元）`
    } else {
        receiptString += `
节省：${totalType.save}（元）
总计：${totalType.total}（元）`
    }
    return receiptString;
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
    let subtotaledItem = [];
   itemsInfo.map(function (item) {
       let temp = item.price * item.count;
        subtotaledItem.push(Object.assign({}, item, {subotal: temp}))
    });
    return subtotaledItem;
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
        let exit = prototionedId.find(function (id) {
            return id === item.barcode;
        });
        if(exit) {
            let count = item.count - parseInt(item.count /3);
            console.log(count)
            let subtoal = count * item.price;
            let save = item.subotal - subtoal
            return Object.assign({}, item, {save: save, savedSubtotal:subtoal})
        } else {
            return Object.assign({}, item, {save: 0, savedSubtotal:item.savedSubtotal})
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
    if(total > second.total) {
        return second;
    } else {
        return{
            save: 0,
            total: total
        }
    }
}

//console.log(judge(9, {save: 3, total: 6}))

module.exports = {
    formateBarcode: formateBarcode,
    mergedBarcode: mergeBarcode,
    getItemsInfo: getItemsInfo,
    calculateSubotal: calculateSubotal,
    calculateTotal: calculateTotal,
    getPromotionsIds: getPromotionsIds,
    judge: judge,
    calculatePromotion: calculatePromotion,
    promotiondTotal: promotiondTotal,
    printReceipt: printReceipt
};