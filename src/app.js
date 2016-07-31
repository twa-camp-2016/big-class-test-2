
function despiteBarcodes(barcodes) {
    return barcodes.map(function (item) {
        let info = item.split("-");
        return {
            barcode: info[0],
            amount: parseFloat(info[1]) || 1
        };
    });
}


function mergeItems(despitedBarcode) {
    return despitedBarcode.reduce(function (cur, old) {
        let existItem = cur.find(function (item) {
            return item.barcode === old.barcode;
        });
        if (existItem) {
            existItem.amount += old.amount;
        }
        else {
            cur.push(old);
        }
        return cur;
    }, []);
}
function matchCartItems(itemAmounts,allItems){
    return itemAmounts.map(function(obj){
        return Object.assign({},allItems.find(function(item){
            return item.barcode === obj.barcode;
        }),{amount:obj.amount})
    });
}
function calculateSubtotals(cartItems){
    return cartItems.map(function(obj){
       return Object.assign({},obj,{subtotal:obj.price*obj.amount})
    })
}
function calculateAlltotals(subtotals){
    return subtotals.reduce(function(init,cur){
        return init + cur.subtotal;
    },0)
}
function mergePromotionType(subtotals,promotions){
    let promoteType = promotions.find(pro =>pro.hasOwnProperty('type')).barcodes;
    return subtotals.map(function(item){
        let result = promoteType.find(function(bar){
            return bar === item.barcode;
        });
        if(result){
            return Object.assign({},item,{type:"BUY_TWO_GET_ONE_FREE"})
        }else{
            return Object.assign({},item,{type:"none"})
        }
    })
}
function promoteItemAmount(promotedItems){
    return promotedItems.map(obj => {
        if(obj.type === "BUY_TWO_GET_ONE_FREE"){
           return Object.assign({},obj,{proAmount:obj.amount - parseInt(obj.amount / 3)})
        }
        else{
            return Object.assign({},obj,{proAmount:obj.amount})
        }
    })
}
function calculatePromotionSubtotals(promotedAmount){
    return promotedAmount.map(obj => {
        return Object.assign({},obj,{promotedSubtotal:obj.price*obj.proAmount})
    })
}
function calculatePromotionAlltotal(promotedSubtotals){
    return promotedSubtotals.reduce((init,cur) => {
        return init + cur.promotedSubtotal},0)
}
function calculatePromotionCash(alltotal,promotedAlltotal){
    return alltotal - promotedAlltotal;
}
module.exports = {
    despiteBarcodes: despiteBarcodes,
    mergeItems: mergeItems,
    matchCartItems: matchCartItems,
    calculateSubtotals: calculateSubtotals,
    calculateAlltotals: calculateAlltotals,
    mergePromotionType: mergePromotionType,
    promoteItemAmount: promoteItemAmount,
    calculatePromotionSubtotals: calculatePromotionSubtotals,
    calculatePromotionAlltotal: calculatePromotionAlltotal,
    calculatePromotionCash:calculatePromotionCash
}
