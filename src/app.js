'use strict';

function getBarcodes(tags) {

  return tags.map(function (item) {
    let info = item.split('-');

    return {
      barcode: info[0],
      count: parseInt(info[1]) || 1
    }
  });
}

function getCartItems(mergedBarcodes, allItems) {
  return mergedBarcodes.map(function (item) {
    let exist = allItems.find(function (info) {
      return info.barcode === item.barcode;
    });

    if (exist) {
      return Object.assign({}, exist, {count: item.count});
    }
  });
}

function getPromotions(cartItems, promotions) {
  return cartItems.map(function (item) {
    for (let pro of promotions) {
      let exist = pro.barcodes.find(function (barcode) {
        return barcode === item.barcode;
      });

      if (exist) {
        return Object.assign({}, item, {type: pro.type});
      }
    }
  });
}

function getSubtotal(promotionTypedCartItems) {
  return promotionTypedCartItems.map(function (item) {
    return Object.assign({}, item, {subtotal: item.price * item.count});
  });
}

function getSavedSubtotal(subtotalCartItems){
  return subtotalCartItems.map(function(item){
    let money = (item.count - parseInt(item.count / 3)) * item.price;
    return Object.assign({}, item, {afterSavedSubtotal: money});
  })
}
module.exports = {
  getBarcodes: getBarcodes,
  getCartItems: getCartItems,
  getPromotions: getPromotions,
  getSubtotal: getSubtotal,
  getSavedSubtotal: getSavedSubtotal,
}