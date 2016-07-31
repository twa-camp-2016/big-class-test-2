'use strict';
const fix=require('../spec/fixture')


function getCartItems(tags){
    return tags.map(function (tag) {
        let arr=tag.split("-");
        return arr.length===2?{
            barcode:arr[0],amount:parseInt(arr[1])}:
        {
            barcode:arr[0],amount:1
        }
    });
}

function calAmountItems(items) {
    let amountBarList=[];
    for (let i=0;i<items.length;i++){
        let exsit=amountBarList.find(function (item) {
            return item.barcode===items[i].barcode;
        })
        if (!exsit){
            amountBarList.push(items[i])
        }
        else {
            exsit.amount=parseFloat(items[i].amount)+parseFloat(exsit.amount);
        }
    }
    return amountBarList;
}

let loadPromotions=fix.loadPromotions();
let loadAllItems=fix.loadAllItems();

function matchPromotionType(amountBarList,loadPromotions) {
    let promotionItems=[];
    for (let i=0;i<amountBarList.length;i++){
        promotionItems.push(amountBarList[i]);
        promotionItems[i].type='';
    }
    for (let j=0;j<loadPromotions[0].barcodes.length;j++){
        let exist=promotionItems.find(function (it) {
           
            return it.barcode===loadPromotions[0].barcodes[j];
        })
        if (exist){ console.log("aaa");
            exist.type=loadPromotions[0].type;
        }
    }
    return promotionItems;

}

function matchAllItems(promotionItems,loadAllItems) {
    let cartItems=[];

    for (let k=0;k<promotionItems.length;k++){
        cartItems.push(promotionItems[k]);
    }

    for(let i=0;i<cartItems.length;i++){
        for (let j=0;j<loadAllItems.length;j++){
            if (cartItems[i].barcode === loadAllItems[j].barcode){
                cartItems[i].name=loadAllItems[j].name;
                cartItems[i].price=loadAllItems[j].price;
                cartItems[i].unit=loadAllItems[j].unit;
            }
        }
    }
    return cartItems;
}

function calSavingList(cartItems) {
    let savingList=[];

    for (let i=0;i<cartItems.length;i++){
        savingList.push(cartItems[i]);
        savingList[i].saving=0;
        if (cartItems[i].type==='BUY_TWO_GET_ONE_FREE'){
            let price=parseFloat(savingList[i].price);
            let amount=Math.floor(savingList[i].amount/3);
            savingList[i].saving=parseFloat(price*amount);
        }
    }
    return(savingList);
}

function calSubtotalList(savingList) {
    let subtotalList=[];
    for(let i=0;i<savingList.length;i++){
        subtotalList.push(savingList[i]);
        subtotalList[i].subtotal=subtotalList[i].amount*subtotalList[i].price-subtotalList[i].saving;
    }

    return subtotalList;
}


function calWholeSaving(subtotalList) {
    let sumSaving=0;
    Number(sumSaving);
    for(let i=0;i<subtotalList.length;i++){
        sumSaving+=Number(subtotalList[i].saving);
    }

    return sumSaving;
}

function calTotal(subtotalList) {
    let totalNum=0;
    Number(totalNum);
    for(let i=0;i<subtotalList.length;i++){
        totalNum+=Number(subtotalList[i].subtotal);
    }

    return totalNum;
}


function printReceipt(tags) {
    let items=getCartItems(tags);
    let amountBarList=calAmountItems(items);
    let loadPromotions=fix.loadPromotions();
    let loadAllItems=fix.loadAllItems();
    let promotionItems=matchPromotionType(amountBarList,loadPromotions);
    let cartItems=matchAllItems(promotionItems,loadAllItems);
    let savingList=calSavingList(cartItems);
    let subtotalList= calSubtotalList(savingList);
    let sumSaving=calWholeSaving(subtotalList);
    let totalNum=calTotal(subtotalList);
}


module.exports={
    getCartItems:getCartItems,calAmountItems:calAmountItems,
    matchPromotionType:matchPromotionType,
    matchAllItems:matchAllItems,calSavingList:calSavingList,
    calSubtotalList:calSubtotalList,calWholeSaving:calWholeSaving,
    calTotal:calTotal
}