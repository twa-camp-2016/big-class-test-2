'use strict'
let b=require('../spec/fixture');
function formatTags(tags){
    return tags.map(tag=>{
        const info=tag.split('-');
        return {
            barcode:info[0],
            amount:parseFloat(info[1])||1
        }
        });
}
function mergedBarcodes(barcodes){
    let mergedBarcodes=[];
    barcodes.forEach(bar=>{
     let existItems=mergedBarcodes.find(mer=>mer.barcode===bar.barcode);
        existItems===undefined?mergedBarcodes.push(bar):existItems.amount+=bar.amount;
    })
    return mergedBarcodes;
}
function getCartItems(items,accountedBarcodes){
    return accountedBarcodes.map(bar=>{
        let existItem=items.find(item=>bar.barcode===item.barcode);
        return Object.assign({},existItem,{amount:bar.amount});
    })
}
function getSubtotal(cartItems){
    return cartItems.map(ca=>{
        return Object.assign({},ca,{subtotal:ca.price*ca.amount});
    })
}
function getTotal(detailedCartItems) {
    return detailedCartItems.reduce((v,k)=>v+=k.subtotal,0);
}
function getCartPromotionItems(detailedCartItems, promotions) {
    detailedCartItems.forEach(function(item){
         if(promotions[0].barcodes.find(function(bar){return bar===item.barcode}))
                 item.subtotal=parseFloat(item.subtotal/2)})
    return detailedCartItems;
}

function getPromotionTotal(cartPromotionItems) {
    return cartPromotionItems.reduce((v,k)=>v+=k.subtotal,0);
}
function print(cartPromotionItems,total,promotionTotal){
   let result='<没钱赚商店>收据***\n';
    cartPromotionItems.forEach(item=>result+='名称：'+item.name+'，数量：'+item.amount+item.unit+'，单价：'+item.price.toFixed(2)+'（元），小计：'
        +item.subtotal.toFixed(2)+'（元）\n');
    result+='------------\n总计：'+promotionTotal.toFixed(2)+'（元）\n';
    result+='节省：'+(total-promotionTotal).toFixed(2)+'（元）\n*************************';
    return result;
}
function printReceipt(tags){
    let barcodes=formatTags(tags);
    let accountedBarcodes=mergedBarcodes(barcodes);
    let cartItems=getCartItems(b.loadAllItems(),accountedBarcodes);
    let detailedCartItems=getSubtotal(cartItems);
    let total=getTotal(detailedCartItems);
    let cartPromotionItems=getCartPromotionItems(detailedCartItems, b.loadPromotions());
    let promotionTotal=getPromotionTotal(cartPromotionItems);
    return print(cartPromotionItems,total,promotionTotal);
}
module.exports={
    formatTags:formatTags,
    mergedBarcodes:mergedBarcodes,
    getCartItems:getCartItems,
    getSubtotal:getSubtotal,
    getTotal:getTotal,
    getCartPromotionItems:getCartPromotionItems,
    getPromotionTotal:getPromotionTotal,
     print:print,
    printReceipt:printReceipt
}