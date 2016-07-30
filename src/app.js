'use strict';
function formatBarcode(tags) {
    let tag;
    return tags.map((item)=> {
        tag = item.split('-');
        return {
            barcode: tag[0],
            amount: parseInt(tag[1]) || 1
        }
    });
}

function mergerBarcode(barcode) {
    return barcode.reduce(function (cur, newObj) {
        let existItem = cur.find(function (item) {
            return item.barcode === newObj.barcode;
        });
        if (existItem) {
            existItem.amount += newObj.amount;
        }
        else {
            cur.push(Object.assign({}, newObj));
        }
        return cur;
    }, []);
}

function getCartItems(barcodeItems,allItems) {
    let result=[];
    barcodeItems.forEach((itemB)=>{
        allItems.forEach((itemA)=>{
            if(itemA===itemB){
                result.push(Object.assign({},allItems,{amount:barcodeItems.amount}));
            }
        });
    });
}
module.exports={
    formatBarcode:formatBarcode,
    mergerBarcode:mergerBarcode,
    getCartItems:getCartItems
}
