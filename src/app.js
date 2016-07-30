'use strict';

let allItems=loadAllItems();
let promotion=loadPromotions();
let tags=["ITEM0001", "ITEM0013-2", "ITEM0022-3","ITEM0001","ITEM00022"];
function splitTag(tags) {
    let splitTag = tags.map(
        function (tags) {
            let temp = tags.split(" - ");
            return {
                barcode: temp[0],
                count: parseInt(temp[1])
            }
        }
    );
    return splitTag;
}
function getTagCount(splitTag) {
    let allTagCount=[];
    for (let i=0;i<splitTag.length;i++){
        let existItem = allTagCount.find(
            function (item) {
                if (item.barcode===splitTag[i].barcode){
                    return item;
                }
            }
        );
        if (existItem){
            existItem.count+=splitTag[i].count;
        }else {
            allTagCount.push(Object.assign({},splitTag[i],{count:splitTag[i].count}));
        }
    }
    return allTagCount;
}
function matchPromotion(allTagCount, promotion) {
    let itemsPromotion = [];
    let type;
    for (let i = 0; i < allTagCount.length; i++) {
        promotion.find(function (item) {
            if (item.items) {
                let existItems = item.items.find(function (barcode) {
                    return barcode === allTagCount[i].barcoded;
                });
                if (existItems) {
                    type = item.type;
                }
            }
            else {
            }
        });
        itemsPromotion.push(Object.assign({}, allTagCount[i], {type: type}));
    }
    return itemsPromotion;
}
function matchItems(itemsPromotion, allItems) {
    let cartItemsCount = [];
    for (let i = 0; i < itemsPromotion.length; i++) {
        let existItems = allItems.find(function (item) {
            if (item.barcode === itemsPromotion[i].barcode) {
                return item;
            }
        });
        if (existItems) {
            cartItemsCount.push(Object.assign({}, existItems, {type: itemsPromotion[i].type}, {count: itemsPromotion[i].count}));
        }
    }
    return cartItemsCount;
}


function getDiscountSubtotal(cartItemsCount,promotion) {
    let discountSubtotal=[];
    for(let i=0;i<cartItemsCount.length;i++){
        discountSubtotal=cartItemsCount[i].price*cartItemsCount[i].count;
        for(let j=0;j<promotion[0].barcodes.length;j++){
            if(cartItemsCount[i].barcode===promotion[0].barcodes[j]) {
                discountSubtotal -=cartItemsCount[i].price * (Math.floor(cartItemsCount[i].count / 3));
            }
        }
        discountSubtotal.push(Object.assign({},cartItemsCount[i],{discountSubtotal:discountSubtotal}));
    }
    return discountSubtotal;
}


function getSubtotal(cartItemsCount) {
    let subtotal = [];
    let noDiscountSubtotal = 0;
    for (let i = 0; i < cartItemsCount.length; i++) {
        noDiscountSubtotal += cartItemsCount[i].price * cartItemsCount[i].count;
        subtotal.push(Object.assign({},cartItemsCount[i],{noDiscountSubtotal:noDiscountSubtotal}));
    }
    return subtotal;
}

function getSaveTotal(discountSubtotal, subtotal) {
    let saveTotal = 0;
    for (let i = 0; i < subtotal.length; i++) {
        if (subtotal[i].barcode === discountSubtotal[i].barcode) {
            saveTotal += (subtotal[i].noDiscountSubtotal - discountSubtotal[i].discountSubtotal);
        }
    }
    return saveTotal;
}

function getTotal(discountSubtotal) {
    let total = 0;
    for (let i = 0; i < discountSubtotal.length; i++) {
        total += discountSubtotal[i].discountSubtotal;
    }
    return total;
}

function print(discountSubtotal, total, saveTotal) {
    for (let i = 0; i < discountSubtotal.length; i++) {
        console.log("商品：" + discountSubtotal[i].name + ",单价："
            + discountSubtotal[i].price + "元," + "件数："
            + "" + discountSubtotal[i].count + ",小计：" + discountSubtotal[i].discountSubtotal + "元");
        console.log("节省：" + saveTotal + "元");
        console.log("总价：" + total + "元");
    }
}

function printReceipt(tags) {
    let allItems = loadAllItems();
    let promotion = loadPromotions();
    let splitTag = splitTag(tags);
    let allTagCount=getTagCount(splitTag);
    let itemsPromotion = matchPromotion(allTagCount, allItems);
    let cartItemsCount = matchItems(itemsPromotion, promotion);
    let discountSubtotal=getDiscountSubtotal(cartItemsCount,promotion);
    let subtotal = getSubtotal(cartItemsCount);
    let saveTotal=getSaveTotal(discountSubtotal,subtotal);
    let total=getTotal(discountSubtotal);
    print(saveSubtotal, total, saveTotal);
}
printReceipt(tags);

module.exports = {
    splitTag: splitTag,
    getTagCount: getTagCount,
    matchPromotion: matchPromotion,
    matchItems: matchItems,
    getDiscountSubtotal: getDiscountSubtotal,
    getSubtotal: getSubtotal,
    getSaveTotal: getSaveTotal,
    getTotal: getTotal,
}



