/*global module,require*/
const link = require('../spec/fixture.js');
function getItems(tags) {
    return tags.map(tag=> {
        let temp = tag.split('-');
        return {
            barcode: temp[0],
            amount: parseFloat(temp[1]) || 1
        }
    });
}

function getItemsAmount(items) {
    let itemsAmount = [];
    items.map(item=> {
        let exit = itemsAmount.find(function (temp) {
            return item.barcode === temp.barcode;
        });
        if (exit) {
            exit.amount += item.amount;
        }
        else {
            itemsAmount.push(Object.assign({}, item));
        }
    });
    return itemsAmount;
}

function getCartItems(itemsAmount) {
    let allItems = link.loadAllItems();
    let cartItems = [];
    itemsAmount.map(item=> {
        let exit = allItems.find(function (temp) {
            return temp.barcode === item.barcode;
        });
        if (exit) {
            cartItems.push(Object.assign({}, exit, {amount: item.amount}));
        }
    });
    return cartItems;
}

function calculateOriginal(cartItems) {
    let originalSubtotal = [];
    cartItems.map(item=> {
        originalSubtotal.push(Object.assign({}, item, {originalSubtotal: item.amount * item.price}));
    });
    return originalSubtotal;
}

function getCartItemsPromotion(originalSubtotal) {
    let itemsPromotion = [];
    let promotions = link.loadPromotions();
    originalSubtotal.map(item=> {
        let exit = promotions.find(temp=> {
            return temp.barcodes.find(code=> {
                return code === item.barcode;
            });
        });
        if (exit) {
            itemsPromotion.push(Object.assign({}, item, {type: exit.type}));
        }
        else {
            itemsPromotion.push(Object.assign({}, item))
        }
    });
    return itemsPromotion;
}

function calculateSubtotal(itemsPromotion) {
    let subtotalItems = [];
    itemsPromotion.map(item=> {
        let subtotal = 0;
        if (item.type === 'BUY_TWO_GET_ONE_FREE') {
            subtotal = item.originalSubtotal - parseInt(item.amount / 3) * item.price;
        }
        else {
            subtotal = item.originalSubtotal;
        }
        subtotalItems.push(Object.assign({}, item, {subtotal: subtotal}));
    });
    return subtotalItems;
}

function calculatePromotion(subtotalItems) {
    let promotion = subtotalItems.map(item=> {
        return item.originalSubtotal - item.subtotal;
    });
    return promotion.reduce((tempa, tempb)=> {
        return tempa + tempb;
    });
}

function calculateTotal(subtotalItems) {
    let total = subtotalItems.map(item=> {
        return item.subtotal;
    });
    return total.reduce((a, b)=> {
        return a + b;
    });
}

function printReceipt(tags) {
    let items = getItems(tags);
    let itemsAmount = getItemsAmount(items);
    let cartItems = getCartItems(itemsAmount);
    let originalSubtotal = calculateOriginal(cartItems);
    let promotionItems = getCartItemsPromotion(originalSubtotal);
    let subtotalItems = calculateSubtotal(promotionItems);
    let promotion = calculatePromotion(subtotalItems);
    let total = calculateTotal(subtotalItems);
    console.log(`******<没钱赚商店>收据******`);
    subtotalItems.map(item=> {
        console.log(`名称:${item.name},数量:${item.amount}${item.unit},单价${item.price}(元),小计${item.subtotal}(元)`);
    });
    console.log(`--------------------------------`);
    console.log(`${total}元`);
    console.log(`${promotion}元`);
    console.log(`--------------------------------`)
}

module.exports = {
    getItems: getItems,
    getItemsAmount: getItemsAmount,
    getCartItems: getCartItems,
    calculateOriginal: calculateOriginal,
    getCartItemsPromotion: getCartItemsPromotion,
    calculateSubtotal: calculateSubtotal,
    calculatePromotion: calculatePromotion,
    calculateTotal: calculateTotal,
    printReceipt: printReceipt
}

