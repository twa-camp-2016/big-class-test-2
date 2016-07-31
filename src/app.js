/*global module*/

let allItems = [
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50
    },
    {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
    },
    {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
    },
    {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50
    }
];
let allPromotions = [
    {
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
            'ITEM000000',
            'ITEM000001',
            'ITEM000005'
        ]
    }
];
//格式化条码
function formatItem(items) {
    let formattedItems = [];
    for (let i = 0; i < items.length; i++) {
        let temp = items[i].split('-');
        if (temp.length === 2) {
            formattedItems.push(Object.assign({}, {barcode: temp[0]}, {count: Number(temp[1])}));
        } else {
            formattedItems.push(Object.assign({}, {barcode: temp[0]}, {count: 1}));
        }
    }
    return formattedItems;
}
//去重
function mergeItems(formattedItems) {
    var mergedItems = [];
    for (var i = 0; i < formattedItems.length; i++) {
        let existList = mergedItems.find(function (item) {
            return item.barcode === formattedItems[i].barcode;
        });
        if (existList) {
            existList.count += formattedItems[i].count;
        } else {
            mergedItems.push(Object.assign({}, {barcode: formattedItems[i].barcode}, {count: formattedItems[i].count}));
        }
    }
    return mergedItems;
}
//加载商品信息
//let allItems = loadAllItems();
//匹配商品信息
function matchItems(mergedItems, allItems) {
    let cartItems = [];
    for (let i = 0; i < allItems.length; i++) {
        let existList = mergedItems.find(function (item) {
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
        var originSubtotal = parseFloat(cartItems[i].price) * (cartItems[i].count);
        originSubtotalList.push(Object.assign({}, cartItems[i], {originSubtotal: originSubtotal}));
    }
    return originSubtotalList;
}
//加载优惠信息
//let allPromotions = loadPromotions();
//匹配优惠信息
function matchPromotions(originSubtotalList, allPromotions) {
    let newSubtotalList = [];

    for (let i = 0; i < allPromotions[0].barcodes.length; i++) {
        let existList = originSubtotalList.find(function (item) {
            return item.barcode === allPromotions[0].barcodes[i];
        });
        if (existList) {
            newSubtotalList.push(Object.assign({}, originSubtotalList[i], {type: allPromotions[0].type}));
        }
    }

    return newSubtotalList;
}
//计算节省
function calculateSaving(newSubtotalList) {
    let savingList = [];
    for (let i = 0; i < newSubtotalList.length; i++) {
        if (newSubtotalList[i].type === 'BUY_TWO_GET_ONE_FREE') {
            let saving = parseFloat((Math.floor(newSubtotalList[i].count / 3)) * newSubtotalList[i].price);
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
    for (let i = 0; i < savingList.length; i++) {
        let subtotal = parseFloat(savingList[i].originSubtotal - savingList[i].saving);
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
    let receipt = '';
    for (let i = 0; i < finalSubtotalList.length; i++) {
        receipt += "名称:" + finalSubtotalList[i].name + "，"
            + "数量:" + finalSubtotalList[i].count + finalSubtotalList[i].unit + "，"
            + "单价:" + (finalSubtotalList[i].price).toFixed(2) + "(元)" + "，"
            + "小计:" + (finalSubtotalList[i].subtotal).toFixed(2) + "(元)"+"\n";
    }
    receipt += "总计:" + total.toFixed(2) + "(元)" + "\n" + "节省:" + savingTotal.toFixed(2) + "(元)";
    return receipt;
}
//主调
function printReceipt(items) {
    let formattedItems = formatItem(items);
    let mergedItems = mergeItems(formattedItems);
    let cartItems = matchItems(mergedItems, allItems);
    let originSubtotalList = calculateOriginSubtotal(cartItems);
    let newSubtotalList = matchPromotions(originSubtotalList, allPromotions);
    let savingList = calculateSaving(newSubtotalList);
    let savingTotal = calculateSavingTotal(savingList);
    let finalSubtotalList = calculateSubtotal(savingList);
    let total = calculateTotal(finalSubtotalList);
    return print(finalSubtotalList, savingTotal, total);
}

module.exports = {
    formatItem: formatItem,
    mergeItems: mergeItems,
    matchItems: matchItems,
    calculateOriginSubtotal: calculateOriginSubtotal,
    matchPromotions: matchPromotions,
    calculateSaving: calculateSaving,
    calculateSavingTotal: calculateSavingTotal,
    calculateSubtotal: calculateSubtotal,
    calculateTotal: calculateTotal,
    print: print,
    printReceipt:printReceipt
};