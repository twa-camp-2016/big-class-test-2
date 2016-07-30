const obj2 = require('../spec/fixture.js');

function formatBarcodes(tags) {
    return array = tags.map(function (tag) {
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
        // allTags.map(function (element) {
        //     let exist=countBarcodes.map(function (m) {
        //         if (m.barcode === element.barcode) {
        //             //noinspection JSAnnotator
        //             break;
        //         }
        //     });
        //     if (exist) {
        //         m.amount += element.amount;
        //     }
        //     else {
        //         countBarcodes.push({barcode: element.barcode, amount: element.amount});
        //     }
        // });
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
        })
    })
    return array;
}


module.exports = {
    formatBarcodes: formatBarcodes,
    getBarcodeAmount: getBarcodeAmount,
    getCartItems: getCartItems
}