
const load=require('../spec/fixture');

function splitTags(tags) {
    let splitedTags=[];
    splitedTags=tags.map((tag)=>{
        let arr=tag.split('-');
        return {
            barcode:arr[0],
            count:parseFloat(arr[1])||1
        }
    });

    return splitedTags;
}

function getCount(formatedTags) {
    let countedItems = [];
    countedItems = formatedTags.reduce(function (cur, newArr) {
        let exist = cur.find(function (item) {
            return item.barcode === newArr.barcode;
        });
        if (!exist) {
            exist = Object.assign({}, newArr, {count: 0});
            cur.push(exist);
        }
        exist.count += newArr.count;
        return cur;
    }, []);

    return countedItems;
}

function getType(countedItems) {
    let proInfo=load.loadPromotions();
    let hasTypeItems=[];
    for(let i of countedItems){
        let exist=proInfo.find((pro)=>{
           return pro.barcodes.includes(i.barcode);
        });
        if(exist){
            hasTypeItems.push(Object.assign({},i,{type: 'BUY_TWO_GET_ONE_FREE'}));

        }
        else {
            hasTypeItems.push(Object.assign({},i,{type: 'other'}));
        }

    }
    return hasTypeItems;
}

function getCartItems(hasTypeItems) {
    let cartItems=[];
    let allItems=load.loadAllItems();
    for(let i of cartItems){
        for(let j of allItems){
            if(i.barcode===j.barcode){
                cartItems.push(Object.assign({},j,{count:i.count,type:i.type}));
            }
        }
    }
    return cartItems;
}

function getDiscount(cartItems) {
    let hasSubtotalItems=[];
    for(let i of cartItems){
        if(i.type==='BUY_TWO_GET_ONE_FREE'){
            let subtotal=i.price*i.count-Math.floor(i.price*((i.count)/3));
            hasSubtotalItems.push(Object.assign({},i,{subtotal:subtotal}));
        }
        else {
            let subtotal=i.price*i.count;
            hasSubtotalItems.push(Object.assign({},i,{subtotal:subtotal}));        }
    }
    return hasSubtotalItems;
}

function getTotal(hasSubtotalItems) {
    let total = 0;
    for (let i of hasSubtotalItems) {
        total += i.subtotal;
    }
    return total;
}

function getSavedMoney(hasSubtotalItems) {
    let total=getTotal(hasSubtotalItems);
    let savedMoney=0;
    let totalInit=0
    for(let i of hasSubtotalItems){
        totalInit+=i.price*i.count;
    }
    savedMoney=totalInit-total;
    
    return savedMoney;
}

module.exports={
 splitTags:splitTags,
    getCount:getCount,
    getType:getType,
    getCartItems:getCartItems,
    getDiscount:getDiscount,
    getTotal:getTotal,
    getSavedMoney:getSavedMoney
};