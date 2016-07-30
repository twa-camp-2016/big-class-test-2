const loadInfo = require("../spec/fixture.js");

function printReceipt(tags) {
    let items = loadInfo.loadAllItems();
    let promotions = loadInfo.loadPromotions();
    let barcodes = formatTags(tags);
    let mergedBarcodes = mergeBarcodes(barcodes);
    let cartItems = getCartItems(mergedBarcodes, items);
    let subTotalItems = getSubTotalItems(cartItems);
    let discountSubTotalItems = getDiscountSubTotalItems(subTotalItems, promotions);
    let save = getSave(discountSubTotalItems);
    let total = getTotal(discountSubTotalItems);
    return print(discountSubTotalItems, save, total);
}


function formatTags(tags) {
    return tags.map((tag) => {
        let splitTag = tag.split('-');
        if(splitTag[1] === undefined){
            return {barcode: splitTag[0], count: 1};
        }else{
            return {barcode: splitTag[0], count: parseInt(splitTag[1])};
        }
    });
}

function mergeBarcodes(barcodes) {
    let mergedBarcodes = [];
    for(let barcode of barcodes){
        let exsit = mergedBarcodes.find(item => item.barcode === barcode.barcode);
        if(exsit){
            exsit.count += barcode.count;
        }else{
            mergedBarcodes.push(Object.assign({}, {barcode: barcode.barcode, count: barcode.count}));
        }
    }
    return mergedBarcodes;
}

function getCartItems(mergedBarcodes, items) {
    let cartItems = [];
    for(let item of mergedBarcodes){
        let exist = items.find(element => element.barcode === item.barcode);
        cartItems.push(Object.assign({}, exist, {count: item.count}));
    }
    return cartItems;
}

function getSubTotalItems(cartItems) {
    let subTotalItems = [];
    let subTotal = 0;
    for(let item of cartItems){
        subTotal = item.price * item.count;
        subTotalItems.push(Object.assign({}, item, {subTotal: subTotal}))
    }
    return subTotalItems;
}

function getDiscountSubTotalItems(subTotalItems, promotions) {
    let discountSubTotalItems = [];
    let discountSubTotal = 0;
    for(let item of subTotalItems){
        let exist = promotions.find((promotion) => {
            if(promotion.type === 'BUY_TWO_GET_ONE_FREE')
                return promotion.barcodes.find(barcode => item.barcode === barcode);
        });
        if(exist){
            discountSubTotal = item.subTotal - parseInt(item.count / 3) * item.price;
        }else{
            discountSubTotal = item.subTotal;
        }
        discountSubTotalItems.push(Object.assign({}, item, {discountSubTotal: discountSubTotal}));
    }
    return discountSubTotalItems;
}


function getSave(discountSubTotalItems) {
    let save = 0;
    for(let item of discountSubTotalItems){
        save += item.subTotal-item.discountSubTotal;
    }
    return save;
}

function getTotal(discountSubTotalItems) {
    let total = 0;
    for(let item of discountSubTotalItems){
        total += item.discountSubTotal

    }
    return total;
}

function print(discountSubTotalItems, save, total) {
    let receipt = '***<没钱赚商店>收据***\n';
    for(let item of discountSubTotalItems){
        receipt += ('名称：' + item.name + '，数量：' + item.count + item.unit + '，单价：' +
            (item.price).toFixed(2) + '(元)，小计：' + (item.discountSubTotal).toFixed(2)+ '(元)\n');
    }
    receipt += '----------------------\n'+ '总计：' + (total).toFixed(2) + '(元)\n' + '节省：' + (save).toFixed(2) + '(元)\n' +'**********************';

    return receipt.trim();
}

module.exports = {
    printReceipt: printReceipt,
    formatTags: formatTags,
    mergeBarcodes: mergeBarcodes,
    getCartItems: getCartItems,
    getSubTotalItems: getSubTotalItems,
    getDiscountSubTotalItems: getDiscountSubTotalItems,
    getSave: getSave,
    getTotal: getTotal,
    print: print
};