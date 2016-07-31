function getItemAmount(barcodes) {
    return barcodes.map(function (barcode) {
        let exist = barcode.split('-');
        return {
            barcode: exist[0],
            amount: parseFloat(exist[1]) || 1
        }
    })
}
function getAllItemAmount(itemAmount) {
    return itemAmount.reduce(function (cur, old) {
        let exist = cur.find(function (item) {
            return item.barcode === old.barcode;
        });
        if (exist) {
            exist.amount += old.amount;
        } else {
            cur.push(old);
        }
        return cur;
    }, [])
}

function getCartItems(itemAmounts, allItems) {
    return itemAmounts.map(item =>{
        return Object.assign({},allItems.find(all =>all.barcode === item.barcode),{amount:item.amount})
    })
}

function promotedType(promotions, cartItems) {
    let promoteType = promotions.find(pro =>pro.hasOwnProperty('type')).barcodes;
    return cartItems.map(function(item){
       let result = promoteType.find(function(entry){
          return entry === item.barcode;
       });
        if(result){
            return Object.assign({},item,{type:"BUY_TWO_GET_ONE_FREE"})
        }else{
            return Object.assign({},item,{type:"none"})
        }

    })
}
function calculatePromotedAmount(promotedTypes){
    return promotedTypes.map(item =>{
        if(item.type === "BUY_TWO_GET_ONE_FREE"){
            return Object.assign({},item,{promotedAmount:item.amount-parseInt(item.amount/3)})
        }else{
            return Object.assign({},item,{promotedAmount:item.amount});
        }
    });
}

function calculatePromotedMoney(proAmounts){
    return proAmounts.map(item=>{
        return Object.assign({},item,{promotedMoney:item.price * item.promotedAmount});
    });
}

function calculateSubTotal(proMoneys){
    return proMoneys.map(item=>{
        return Object.assign({},item,{subTotal:item.price * item.amount});
    });
}

function calculateTotal(subTotals){
    return subTotals.reduce((cur,item)=>{
        return cur + item.promotedMoney;
    },0);
}

function calculatePromotedTotalMoney(subTotals,total){
    let resullt = subTotals.reduce((cur,item)=>{
        return cur + item.subTotal;
    },0);
    return resullt - total;
}
module.exports = {
    getItemAmounts:getItemAmount,
    getAllItemAmounts:getAllItemAmount,
    getCartItems:getCartItems,
    promotedType:promotedType,
    calculatePromotedAmount:calculatePromotedAmount,
    calculatePromotedMoney:calculatePromotedMoney,
    calculateSubTotal:calculateSubTotal,
    calculateTotal:calculateTotal,
    calculatePromotedTotalMoney:calculatePromotedTotalMoney
}