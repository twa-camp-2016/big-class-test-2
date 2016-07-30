/*global module,require*/
const link = require('../spec/fixture.js');
function getItems(tags) {
    return tags.map(tag=> {
        let temp = tag.split('-');
        return {
            barcode: temp[0],
            amount: parseFloat(temp[1]) || 1
        }
    });
}

function getItemsAmount(items) {
    let itemsAmount = [];
    for (let item of items) {
        let exit = itemsAmount.find(function (temp) {
            return item.barcode === temp.barcode;
        });
        if (exit) {
            exit.amount += item.amount;
        }
        else {
            itemsAmount.push(Object.assign({}, item));
        }
    }
    return itemsAmount;
}

function getCartItems(itemsAmount) {
    let allItems = link.loadAllItems();
    let cartItems = [];
    for (let item of itemsAmount) {
        let exit = allItems.find(function (temp) {
            return temp.barcode === item.barcode;
        });
       if(exit){
           cartItems.push(Object.assign({},exit,{amount:item.amount}));
       }
    }
    return cartItems;
}

function calculateOriginalSubtotal(cartItems) {
  let originalSubtotal=[];
  cartItems.map(item=>{
      originalSubtotal.push(Object.assign({},item,{originalSubtotal:item.amount*item.price}));
  });
  return originalSubtotal;
}

module.exports = {
    getItems: getItems,
    getItemsAmount: getItemsAmount,
    getCartItems: getCartItems,
    calculateOriginalSubtotal:calculateOriginalSubtotal

}

