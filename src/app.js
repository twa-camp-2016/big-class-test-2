/*global require,module*/

const obj2 = require('../spec/fixture.js');
let m;
function formatBarcodes(tags) {
    return tags.map(function (tag) {
        let bar = tag.split('-');
        return {
            barcode: bar[0],
            amount: parseInt(bar[1]) || 1
        }
    });
}

function getBarcodeAmount(allTags) {
    let countBarcodes = [];
    let exist;
    for (let i = 0; i < allTags.length; i++) {
        for (m of countBarcodes) {
            exist = (m.barcode === allTags[i].barcode);
            if (exist)
                break;
        }
        if (exist) {
            m.amount += allTags[i].amount;
        }
        else {
            countBarcodes.push({barcode: allTags[i].barcode, amount: allTags[i].amount});
        }
    }
    return countBarcodes;
}

function getCartItems(finalBarcodes) {
    let array = [];
    let Items = obj2.loadAllItems();
    finalBarcodes.map(function (element1) {
        Items.filter(function (element2) {
            if (element1.barcode === element2.barcode)
                array.push(Object.assign({
                    barcode: element1.barcode,
                    amount: element1.amount, name: element2.name, unit: element2.unit, price: element2.price
                }));
        });
    });
    return array;
}

function getPromotions(allItems) {
    let array = [];
    let promotions = obj2.loadPromotions();
    for (let i=0;i<allItems.length;i++)
    {
        for(m of promotions){
            for(let j=0;j<m.barcodes.length;j++)
                if (allItems[i].barcode === m.barcodes[j]) {
                array.push(Object.assign({}, allItems[i],{type: m.type}));
                }
        }
    }
    return array;
}

function getUnPromoteSubtotal(allPromoteItems) {
    let array = [];
    allPromoteItems.map(function (element) {
        array.push(Object.assign({}, element, {unPromoteSubtotal: element.price * element.amount}));
    });
    return array;
}


function getPromoteSubtotal(items) {
    let array = [];
    items.map(function (item) {
        if (item.type === 'BUY_TWO_GET_ONE_FREE') {
            array.push(Object.assign({}, item, {promoteSubtotal: item.price * item.amount - parseInt(item.amount / 3) * item.price}))
        }
    });
    return array;
}

function getPromoteTotal(totalInformation) {
    let total = 0, save = 0;
    let array = [];
    totalInformation.map(function (item) {
        total +=item.promoteSubtotal;
        save += (item.unPromoteSubtotal - item.promoteSubtotal);
    });
    array.push({total: total, save: save});
    return array;
}


function print(totalInformation, total) {
     let array=[];
     totalInformation.map(function (item) {
         array.push({name:item.name, amount:item.amount, unit: item.unit, price: item.price, promoteSubtotal: item.promoteSubtotal})
     });
    total.map(function (item) {
        array.push(Object.assign({total:item.total,save:item.save}));
    });
    return array;
}

function printReceipt(tags) {
    let formatBarcode=formatBarcodes(tags);
    let mergeBarcode=getBarcodeAmount(formatBarcode);
    let cartItems=getCartItems(mergeBarcode);
    let promotionItems=getPromotions(cartItems);
    let unPromoteItems=getUnPromoteSubtotal(promotionItems);
    let promoteSubtotal=getPromoteSubtotal(unPromoteItems);
    let promoteTotal=getPromoteTotal(promoteSubtotal);
    return print(promoteSubtotal, promoteTotal);
}

module.exports = {
    formatBarcodes: formatBarcodes,
    getBarcodeAmount: getBarcodeAmount,
    getCartItems: getCartItems,
    getPromotions: getPromotions,
    getUnPromoteSubtotal: getUnPromoteSubtotal,
    getPromoteSubtotal: getPromoteSubtotal,
    getPromoteTotal: getPromoteTotal,
    print:print,
    printReceipt:printReceipt
};