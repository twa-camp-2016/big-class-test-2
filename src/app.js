/*global module*/
let items =
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
//格式化条码
function formatItem(items) {
    let formattedItems = [];
    for (let i = 0; i < items.length; i++) {
        let temp = items[i].split('-');
        if (temp.length === 2) {
            formattedItems.push(Object.assign({}, {barcode: temp[0]}, {count: temp[1]}));
        } else {
            formattedItems.push(Object.assign({}, {barcode: temp[0]}, {count: 1}));
        }
    }
    return formattedItems;
}
//加载商品信息
let allItems = loadAllItems();
//匹配商品信息
function matchItems(formattedItems, allItems) {
    let cartItems = [];
    for (let i = 0; i < allItems.length; i++) {
        let existList = formattedItems.find(function (item) {
            return item.barcode === allItems[i].barcode;
        });
        if (existList) {
            cartItems.push(Object.assign({}, allItems[i], {count: existList.count}));
        }
    }
    return cartItems;
}
//计算原始小计
function calculateOriginSubtotal(cartItems) {
    let originSubtotalList = [];
    for (let i = 0; i < cartItems.length; i++) {
        var originSubtotal = parseFloat(cartItems[i].price) * cartItems[i].count;
        originSubtotalList.push(Object.assign({}, cartItems[i], {originSubtotal: originSubtotal}));
    }
    return originSubtotalList;
}
//加载优惠信息
let allPromotions = loadPromotions();
//匹配优惠信息
function matchPromotions(originSubtotalList, allPromotions) {
    let newSubtotalList = [];
    for (let i = 0; i < allPromotions[i].barcode.length; i++) {
        let existList = originSubtotalList.find(function (item) {
            return item.barcode === allPromotions[i].barcode[i];
        });
        if (existList) {
            newSubtotalList.push(Object.assign({}, originSubtotalList[i], {type: allPromotions[i].type}));
        }
        return newSubtotalList;
    }
}
//计算节省
function calculateSaving(newSubtotalList) {
    let savingList = [];
    for (let i = 0; i < newSubtotalList.length; i++) {
        if (newSubtotalList[i].type === 'BUY_TWO_GET_ONE_FREE') {
            let saving = (newSubtotalList[i].count / 3) * newSubtotalList[i].price;
            savingList.push(Object.assign({}, newSubtotalList[i], {saving: saving}));
        }
    }
    return savingList;
}
//计算总节省
function calculateSavingTotal(savingList) {
    let savingTotal = 0;
    for (let i = 0; i < savingList.length; i++) {
        savingTotal += savingList[i].saving;
    }
    return savingTotal;
}
//计算小计
function calculateSubtotal(savingList) {
    let finalSubtotalList = [];
    for (let i = 0; i < savingList; i++) {
        let subtotal = savingList[i].originSubtotal - savingList[i].saving;
        finalSubtotalList.push(Object.assign({}, savingList[i], {subtotal: subtotal}));
    }
    return finalSubtotalList;
}
//计算总计
function calculateTotal(finalSubtotalList) {
    let total = 0;
    for (let i = 0; i < finalSubtotalList.length; i++) {
        total += finalSubtotalList[i].subtotal;
    }
    return total;
}
//输出
function print(finalSubtotalList, savingTotal, total) {

}
//主调
function printReceipt(items) {

}

module.exports = {
    formatItem: formatItem
}