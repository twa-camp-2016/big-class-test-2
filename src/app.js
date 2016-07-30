'use strict';
const fixture = require('../spec/fixture');


function formatTags(tags) {
  return tags.map(tag => {
    let tagPart = tag.split('-');
    return {
      barcode: tagPart[0],
      amount: parseFloat(tagPart[1]) || 1
    }
  })
}

function mergeTags(formattedTags) {
  return formattedTags.reduce((acc, cur) => {
    let found = acc.find(i => i.barcode === cur.barcode);
    if (found)
      found.amount += cur.amount;
    else
      acc.push(cur);
    return acc;
  }, [])
}

function getCartItems(mergedBarcodes, allItems) {
  return mergedBarcodes.map(item=> {
    return Object.assign({}, allItems.find(entry => entry.barcode === item.barcode), {amount: item.amount});
  });
}

function getBuyTwoFreeOneItems(cartItems, allPromotions) {
  let allBuyTwoFreeOneBarcodes = allPromotions.find(p => p.hasOwnProperty('type')).barcodes;
  return cartItems
    .filter(item => allBuyTwoFreeOneBarcodes.find(entry => entry === item.barcode) === undefined ? false : true)
    .map(item=> item.barcode);
}

function calculateOriginSubtotal(cartItems) {
  return cartItems.map(item=> Object.assign({}, item, {originSubTotal: item.amount * item.price}));
}

function getDiscountedItems(buyTwoFreeOneItems, cartItems) {
  return cartItems.map( item => {
    if(buyTwoFreeOneItems.find(barcode => barcode === item.barcode)){
      let discountAmount = Math.floor(item.amount / 3);
      return Object.assign({}, item, {discount: discountAmount * item.price});
    }else
      return Object.assign({}, item, {discount: 0});
  });
}

function getTotalPrice(subTotalCartItems) {
  return subTotalCartItems.reduce((acc, cur) => {
    return acc += (cur.originSubTotal - cur.discount);
  }, 0)

}

function generateReceipt(subTotalCartItems, totalPrice) {

}

function getSubTotalCartItems(originSubTotalCartItems, discountList) {
  return originSubTotalCartItems.map( item => {
    let discounted = discountList.find(entry => entry.barcode === item.barcode);
    return Object.assign({}, item, {subTotal: item.originSubTotal - discounted.discount});
  })
}

function printReceipt(tags) {
  const formattedTags = formatTags(tags);
  const mergedBarcodes = mergeTags(formattedTags);
  const cartItems = getCartItems(mergedBarcodes, fixture.loadAllItems());
  const originSubTotalCartItems = calculateOriginSubtotal(cartItems);
  const buyTwoFreeOneItems = getBuyTwoFreeOneItems(cartItems, fixture.loadPromotions());
  const discountedItems = getDiscountedItems(buyTwoFreeOneItems, cartItems);
  const subTotalCartItems = getSubTotalCartItems(originSubTotalCartItems, discountedItems);
  const totalPrice = getTotalPrice(subTotalCartItems);
  const receipt = generateReceipt(subTotalCartItems, totalPrice);
  return receipt;
}

module.exports = {
  formatTags,
  mergeTags,
  getCartItems,
  getBuyTwoFreeOneItems,
  calculateOriginSubtotal,
  getDiscountedItems,
  getTotalPrice,
  generateReceipt,
  getSubTotalCartItems,
  printReceipt
};