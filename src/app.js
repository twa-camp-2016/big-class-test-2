'use strict';

let tags=[
    'ITEM000',
    'ITEM001',
    'ITEM001',
    'ITEM001',
    'ITEM001',
    'ITEM003-2',
    'ITEM005',
    'ITEM005',
    'ITEM005'];



function getCartItems(tags) {
    return tags.map(function (tag) {
        let arr=tag.split("-");
        return arr.length===2?{
            barcode:arr[0],amount:parseInt(arr[1])}:
        {
            barcode:arr[0],amount:1
        }
    });
}

module.exports={
    getCartItems:getCartItems
}