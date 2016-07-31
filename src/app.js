"use strict"

let fn = require('../spec/fixture')

function printReceipt(tags) {
    let allItems = fn.loadAllItems();
    let promotions = fn.loadPromotions();

    let barcodes = formateBarcode(tags);
    let mergedBarcodes = mergeBarcode(barcodes);
    let itemsInfo = getItemsInfo(allItems, mergedBarcodes);
    let subtotaledItem = calculateSubotal(itemsInfo);
    let total = calculateTotal(subtotaledItem);
    let promotionedId = getPromotionsIds(promotions)

    let promotiondItem = calculatePromotion(subtotaledItem, promotionedId)
    let second = promotiondTotal(promotiondItem);
    let totalType = judge(total, second);
    console.log(promotions)
    console.log(barcodes)
    console.log(mergedBarcodes)
    console.log(itemsInfo)
    console.log(subtotaledItem)
    console.log(total)
    console.log(promotionedId)
    console.log(promotiondItem)
    console.log(second)
    console.log(totalType)

    let receiptString = '';
    for(let item of subtotaledItem) {
        receiptString +=`
名称：${item.name}，数量：${item.count}${item.unit}，小计：${item.subtotal}（元）`
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
        subtotaledItem.push(Object.assign({}, item, {subtotal: temp}))
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
    /*promotions.forEach(function (p) {
        if(p.type === 'BUY_TWO_GET_ONE_FREE') {
            prototionedId =  p.barcodes;
        }
    });*/
    for(let p of promotions) {
        if(p.type === 'BUY_TWO_GET_ONE_FREE') {
            prototionedId = p.barcodes;
        }
    }
    return prototionedId;
}

function calculatePromotion(subtotaledItem, prototiondId) {
    return subtotaledItem.map(function (item) {
        let exit = prototiondId.find(function (id) {
            return id === item.barcode;
        });
        if(exit) {
            let count = parseInt(item.count /3);
            let save = count * item.price;
            let sub = item.subtotal - save
            return Object.assign({}, item, {save: save, savedSubtotal:sub})
        } else {
            return Object.assign({}, item, {save: 0, savedSubtotal:item.subtotal})
        }
    })

}

function promotiondTotal(promotionedItem) {

    let save = 0, saveTotal = 0;
    for(let item of promotionedItem) {
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