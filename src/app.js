/* global module*/
function formatInput(input) {
    return input.map(function (tags) {
        let temp = tags.split('-');
        return {
            barcode: temp[0],
            amount: parseInt(temp[1]) | 1
        };
    });
}

function mergeItems(items) {
    let temp = [];
    items.map(function (tags) {
        let existItem = temp.find(function (elem) {
            if (tags.barcode === elem.barcode) {
                elem.amount += tags.amount;
                return true;
            }
        });
        if (!existItem) {
            temp.push(Object.assign({}, tags));
        }
        return tags;
    });
    return temp;
}


function mergeCartItemsInfo(cartItems, allItems) {
    let cartItemsInfo = [];
    cartItems.map(function (tags) {
        let temp = allItems.find(function (elem) {
            return tags.barcode === elem.barcode;
        });
        return cartItemsInfo.push(Object.assign({}, temp, {amount: tags.amount}));
    });
    return cartItemsInfo;
}

function getSubtotal(cartItemsInfo) {
    let cartItemsSubtotal = [];
    cartItemsInfo.map(function (tags) {
        let sub = tags.price * tags.amount;
        return cartItemsSubtotal.push(Object.assign({}, tags, {subtotal: sub}));
    });
    return cartItemsSubtotal;
}

function mergePromotionInfo(cartItemsSubtotal, promotionInfo) {
    let cartItemsPromotionInfo = [];
    cartItemsSubtotal.map(function (tags) {
        return promotionInfo.map(function (elem) {
            let temp = elem.barcodes.find(function (element) {
                return tags.barcode === element;
            });
            if (temp) {
                cartItemsPromotionInfo.push(Object.assign({}, tags, {type: elem.type}));
            }
            else {
                cartItemsPromotionInfo.push(Object.assign({}, tags));
            }
            return temp;
        });
    });
    return cartItemsPromotionInfo;
}


function getSubsave(cartItemsPromotionInfo) {
    let cartItemsSubSave = [];
    cartItemsPromotionInfo.map(function (tags) {
        let count = 0, subSave = 0;
        if (tags.type && tags.type === 'BUY_TWO_GET_ONE_FREE') {
            count = Math.floor(tags.amount / 3);
            subSave = count * tags.price;
        }
        return cartItemsSubSave.push(Object.assign({}, tags, {subSave: subSave}));
    });
    return cartItemsSubSave;
}

function getTotal(cartItemsSubSave) {
    let total = [];
    let allTotal = 0, allSave = 0;
    cartItemsSubSave.map(function (tags) {
        let subtotal = tags.subtotal - tags.subSave;
        allTotal += subtotal;
        allSave += tags.subSave;
        return total.push(Object.assign({}, {
            name: tags.name,
            amount: tags.amount,
            price: tags.price,
            unit: tags.unit,
            subtotal: subtotal
        }));
    });
    total.push(Object.assign({}, {total: allTotal, allSave: allSave}));
    return total;
}
module.exports = {
    test_1: formatInput,
    test_2: mergeItems,
    test_3: mergeCartItemsInfo,
    test_4: getSubtotal,
    test_5: mergePromotionInfo,
    test_6: getSubsave,
    test_7: getTotal
};