'use strict';
function printReceipt(barcodes) {
    let splitedBarcodes = splitBarcodes(barcodes);
    let mergedBarcodes = mergeBarcode(splitedBarcodes);
    let allItems = loadAllItems();
    let promotions = loadPromotions();
    let cartItems = matchItem(mergedBarcodes,allItems);
    let itemsInfo = matchPromot(cartItems,promotions);
    let uncuttedSubtotal = caculateUncutSubtotal(itemsInfo);
    let uncuttedTotal = caculateUncutTotal(uncuttedSubtotal);
}

function splitBarcodes(barcodes) {
    let result = [];
    for(let i of barcodes){
        let temp =  i.split('-');
        if (temp.length === 2){
            let temp1 = parseFloat(temp[1]);
            barcodes.push(Object.assign({},{barcode:temp[0],amount:temp1}));
        } else {
            barcodes.push(Object.assign({},{barcode:i,amount:1}));
        }
    }
    return result;
}


function mergeBarcodes(splitedBarcodes) {
    let mergedBarcodes = [];
    for(let i=0;i<splitedBarcodes.length;i++){
        let temp = mergedBarcodes.find(function (item) {
            return item.barcode === splitedBarcodes[i].barcode;
        });
        if(temp){
            temp.amount = temp.amount + splitedBarcodes[i].amount;
        } else {
            mergedBarcodes.push(Object.assign({},{barcode:splitedBarcodes[i].barcode},{amount:splitedBarcodes[i].amount}));
        }
    }
    return mergedBarcodes;
}

function matchItem(mergedBarcodes,allItems){
    let cartItems = [];
    for(let i=0;i<mergedBarcodes.length;i++){
        let temp = allItems.find(function (item) {
            return item.barcode === mergedBarcodes[i].barcode;
        });
        if (temp){
            cartItems.push(Object.assign({},temp,{amount:mergedBarcodes[i].amount}));
        }
    }
    return cartItems;
}

function matchPromot(cartItems,promotions) {
    let proItems = [];
    for(let i=0;i<cartItems.length;i++){
        promotions.find(function (item) {
            let exist = item.barcodes.find(function(barcode){
                return barcode ===cartItems[i].barcode;
            });

            let type= '-1';
            if(exist){
                type = item.type;
            }
            proItems.push(Object.assign({},cartItems[i],{type:type}));
        });

    }
    return proItems;
}

function caculateUncutSubtotal(itemsInfo) {
    let uncuttedSubtotal = [];
    for(let i=0;i<itemsInfo.length;i++){
        let temp = (itemsInfo[i].price * itemsInfo[i].amount);
        uncuttedSubtotal.push(Object.assign({},itemsInfo[i],{uncuttedSubtotal:temp}));
    }
    return uncuttedSubtotal;
}

function caculateUncutTotal(uncuttedSubtotal) {
    let uncuttedTotal = 0;
    for(let i of uncuttedSubtotal){
        uncuttedTotal += i.uncuttedSubtotal;
    }
    return uncuttedTotal;
}

module.exports = {splitBarcodes:splitBarcodes,mergeBarcodes:mergeBarcodes,matchItem:matchItem,matchPromot:matchPromot,caculateUncutSubtotal:caculateUncutSubtotal,caculateUncutTotal:caculateUncutTotal};

// ,caculateCutSubtotal:caculateCutSubtotal,caculateCutTotal:caculateCutTotal,caculateSpare:caculateSpare