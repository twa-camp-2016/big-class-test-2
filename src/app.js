'use strict';
function formatBarcode(tags) {
    let tag;
    return tags.map((item)=> {
        tag = item.split('-');
        return {
            barcode: tag[0],
            amount: parseInt(tag[1]) || 0
        }
    });
}

function mergerBarcode(barcode) {
    let result=[];
    barcode.reduce((pre,cur)=>{
        let exist=pre.find((item)=>item.barcode===cur.barcode);
        if(exist){
            exist.amount++;
        }
        else {
            result.push(Object.assign({},{barcode:cur.barcode},{amount:1}));
        }
    },[]);
    return result;
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
