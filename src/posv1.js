'use strict'
let barcodesItem = [
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
    let subtotalItems = [];
    for (let i = 0; i < cartItems.length; i++) {
        let subtotal = cartItems[i].amount * (cartItems[i].price);
        subtotalItems.push(Object.assign({}, cartItems[i], {subtotal: subtotal}));
    }
    return subtotalItems;
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
    let receipt="***<没钱赚商店>收据***";
    for(let i=0;i<savedItems.length;i++) {
        receipt += "名称：" + savedItems[i].name + ", " + "数量: " + savedItems[i].amount + savedItems[i].unit
            + ", " + "单价 ：" + savedItems[i].price + "(元)，" + "小计：" + savedItems[i].subtotal +
            "元" + "\n";
    }
    receipt+='----------------------'+"\n"+"总计："+total+"(元)"+"节省："+allSaving+"(元)";
    receipt+='**********************';
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