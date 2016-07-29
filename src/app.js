'use strict';
function printReceipt(tags){
    let allItems = loadAllItems();
    let allPromotions = loadPromotions();
    let barcodes = formatTags(tags);
    let barItems = mergeBarcodes(barcodes);
    let proItems = matchProType(barItems,allPromotions);
    let cartItems = getCartItems(proItems,allItems);
    let subItems = subTotal(cartItems);
    let proSubItems = proSubTotal(cartItems);
    let noPrototal = total(subItems);
    let proTotal = total(proItems);
    let promotion = getPromotions(proTotal,noPrototal);
    let str = printStr(proSubItems,proTotal,promotion);
    return str;

}
function formatTags(tags){
    return tags.map(function(tag){
        let parsTag = tag.split('-');
        return {
            barcode:parsTag[0],
            amount:Number(parsTag[1])||1
        }
    });
}

function mergeBarcodes(barcodes){
    let barItems = [];
    barcodes.forEach(function(code){
        let exist = barItems.find(function(bar){
            return bar.barcode === code.barcode;
        });

        if(exist){
            exist.amount = exist.amount + code.amount;
        }else{
            barItems.push(code);
        }
    });

    return barItems;
}

function matchProType(barItems,allPromotions){
    let proItems=[];
    barItems.forEach(function(item){
        allPromotions.forEach(function(proItem){
            let exist = proItem.barcodes.find(function(barcode){
                return barcode === item.barcode;
            });
            if(exist){
                proItems.push(Object .assign({},item,{type:proItem.type}));
            }else{
                proItems.push(Object.assign({},item,{type:'-1'}));
            }
        });
    });
    return proItems;
}

function getCartItems(proItems,allItems){
    return proItems.map(function(pro){
        let exist = allItems.find(function(item){
            return item.barcode === pro.barcode;
        });
        if(exist){
            return Object.assign({},exist,{amount:pro.amount,type:pro.type});
        }
    });
    return cartItems;
}
function subTotal(cartItems){

    return subItems;
}
function proSubTotal(cartItems){
    return proSubItems;
}
function total(subItems){
    return subItems.reduce(function(item,sum){
        return sum + item.subtotal;
    },0);
}
function getPromotions(proTotal,noPrototal){
    return Number(noPrototal) - Number(proTotal);
}
function printStr(proSubItems,proSubtotal,promotion){
    return str;
}
module .exports = {
    formatTags:formatTags,
    mergeBarcodes:mergeBarcodes,
    matchProType:matchProType,
    getCartItems:getCartItems,
    subTotal:subTotal,
    proSubTotal:proSubTotal,
    total:total,
    getPromotions:getPromotions,
    printStr:printStr
};