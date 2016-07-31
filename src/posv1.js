'use strict'

function formatItems(barcodesItem) {
    return barcodesItem.map(function (it) {
        let tempArray = it.split('-');
        return {barcode: tempArray[0], amount: parseFloat(tempArray[1]) || 1};
    })
}

function mergeItems(formattedItems) {
    let mergedItems = [];
    for (let i = 0; i < formattedItems.length; i++) {
        let items = mergedItems.find(function (it) {
            return it.barcode === formattedItems[i].barcode;
        })
        if (items) {
            items.amount += formattedItems[i].amount;
        } else {
            mergedItems.push(Object.assign({}, {barcode: formattedItems[i].barcode}, {amount: formattedItems[i].amount}));
        }
    }
    return mergedItems;
}

function getCartItems(mergedItems, allItems) {
    let cartItems = [];
    for (let i = 0; i < allItems.length; i++) {
        let items = mergedItems.find(function (it) {
            return it.barcode === allItems[i].barcode;
        })
        if (items) {
            cartItems.push(Object.assign({}, allItems[i], {amount: items.amount}));
        }
    }
    return cartItems;
}

function calculateSubtotal(cartItems) {
    return cartItems.map(function (it) {
        let subtotal=it.amount*(it.price);
        return {barcode:it.barcode,name:it.name,unit:it.unit,price:it.price,amount:it.amount,subtotal:subtotal};
    })
}

function calculateSaving(subtotalItems, allPromotions) {
    let savingItems = [];
    let tempArray = allPromotions[0].barcodes;
    for (let i = 0; i < subtotalItems.length; i++) {
        let items = tempArray.find(function (it) {
            return it === subtotalItems[i].barcode;
        })
        if (items) {
            let saving = Math.floor(subtotalItems[i].amount / 3) * (subtotalItems[i].price);
            savingItems.push(Object.assign({}, subtotalItems[i], {saving: saving}));
        }
        else {
            savingItems.push(Object.assign({}, subtotalItems[i], {saving: 0}));
        }
    }
    return savingItems;
}

function getNewSubtotal(savingItems) {
    return savingItems.map(function (item) {
        item.subtotal = item.subtotal - item.saving;
        return item;
    })
}

function getTotal(savedItems) {

    let total = 0;
    for (let i = 0; i < savedItems.length; i++) {
        total += savedItems[i].subtotal;
    }
    return total;
}

function getAllSaving(savedItems) {
    let allSaving = 0;
    for (let i = 0; i < savedItems.length; i++) {
        allSaving += savedItems[i].saving;
    }
    return allSaving;
}


function print(total, allSaving, savedItems) {
    let receipt = '';

    for(let i=0;i<savedItems.length;i++){
        
        receipt = receipt + '名称：' + savedItems[i].name+ '，' + '数量：' + savedItems[i].amount +savedItems[i].unit + '，' + '单价：' + savedItems[i].price.toFixed(2)
            + '(元)' + '，' + '小计：' +savedItems[i].subtotal.toFixed(2) + '(元)'  ;
    }

    receipt = '***<没钱赚商店>收据***' + '\n' + receipt + '\n' +'----------------------' + '\n' +
        '总计：' + total.toFixed(2) + '(元)' + '\n' +'节省：' + allSaving.toFixed(2) + '(元)' + '\n'
        + '**********************';

    return receipt;
}

function printReceipt(barcodesItem) {
    let formattedItem = formatItems(barcodesItem);
    let mergedItems = mergeItems(formattedItem);
    let cartItems = getCartItems(mergedItems, loadAllItems());
    let subtotalItems = calculateSubtotal(cartItems);
    let savingItems = calculateSaving(subtotalItems, loadPromotions());
    let savedItems = getNewSubtotal(savingItems);
    let total = getTotal(savedItems);
    let allSaving = getAllSaving(savedItems);
    let receipt=print(total, allSaving, savedItems);
}

module.exports = {
    formatItems: formatItems, mergeItems: mergeItems, getCartItems: getCartItems, calculateSubtotal: calculateSubtotal,
    calculateSaving: calculateSaving, getNewSubtotal: getNewSubtotal, getTotal: getTotal, getAllSaving: getAllSaving,
    print:print
};